
# api/routes/chat.py

# from fastapi import APIRouter
# from pydantic import BaseModel
# from orchestrator import generate_answer
# from database.schema import SessionLocal, Question
# from services.retriever import retrieve_chunks
# from services.citation_mapper import map_citations  # Optional if you want to use your own mapper

# router = APIRouter()

# class ChatRequest(BaseModel):
#     doc_id: str
#     question: str

# @router.post("/")
# async def ask_question(request: ChatRequest):
#     try:
#         doc_id = request.doc_id
#         question = request.question

#         # ✅ Updated retrieval logic
#         retrieval = retrieve_chunks(doc_id, question)
#         chunks = retrieval.get("chunks", [])
#         fallback_answer = retrieval.get("answer", "")
#         citations = retrieval.get("citations", [])

#         if not chunks:
#             return {
#                 "error": "No relevant content found for this document ID.",
#                 "doc_id": doc_id,
#                 "question": question
#             }

#         # ✅ Build context from chunks
#         context = "\n\n".join([chunk["content"] for chunk in chunks])

#         # ✅ Prompt for LLM
#         prompt = f"""You are a research assistant. Answer the question using only the context below.

# Context:
# {context}

# Question: {question}
# """

#         # ✅ Generate answer using LLM
#         final_answer = generate_answer(prompt)

#         # ✅ Fallback to plain summary if LLM fails
#         if not final_answer:
#             final_answer = fallback_answer

#         # ✅ Save to database
#         db = SessionLocal()
#         q = Question(doc_id=doc_id, question_text=question, answer_text=final_answer)
#         db.add(q)
#         db.commit()
#         db.close()

#         # ✅ Return structured response
#         return {
#             "answer": final_answer,
#             "citations": citations,
#             "doc_id": doc_id,
#             "question": question
#         }

#     except Exception as e:
#         print(f"Chat error: {e}")
#         return {
#             "error": "Internal Server Error",
#             "details": str(e),
#             "doc_id": request.doc_id,
#             "question": request.question
#         }

from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from orchestrator import generate_answer
from database.schema import SessionLocal, Question, Document, User
from services.retriever import retrieve_chunks
from services.citation_mapper import map_citations  # Optional if you want to use your own mapper
from services.chat_history import load_chat_history, save_chat_entry
import asyncio
import time

router = APIRouter()

class ChatRequest(BaseModel):
    doc_id: str
    question: str
    user_email: str

class ChatResponse(BaseModel):
    query: str
    answer: str
    citations: list
    doc_id: str
    question: str
    cached: bool

@router.post("/", response_model=ChatResponse)
async def ask_question(request: ChatRequest):
    try:
        print(f"[DEBUG] Chat request received - doc_id: {request.doc_id}, question: {request.question[:50]}...")
        
        doc_id = request.doc_id
        question = request.question
        user_email = request.user_email

        # Validate user exists
        db = SessionLocal()
        user = db.query(User).filter(User.email == user_email).first()
        if not user:
            db.close()
            print(f"[ERROR] User not found: {user_email}")
            raise HTTPException(status_code=404, detail="User not found")
        
        # Validate user has access to this document
        document = db.query(Document).filter(
            Document.doc_id == doc_id,
            Document.user_email == user_email
        ).first()
        if not document:
            db.close()
            print(f"[ERROR] Document access denied - doc_id: {doc_id}, user: {user_email}")
            raise HTTPException(status_code=403, detail="Access denied. Document not found or you don't have permission to access it.")
        
        db.close()
        print(f"[DEBUG] User and document validation passed")

        # ✅ Retrieve relevant chunks from document
        print(f"[DEBUG] Calling retrieve_chunks for doc_id: {doc_id}")
        retrieval = retrieve_chunks(doc_id, question)
        fallback_answer = retrieval.get("answer", "")
        
        print(f"[DEBUG] Retrieval complete - answer length: {len(fallback_answer)}")

        # ✅ Use the retriever answer directly (it handles all the processing)
        final_answer = fallback_answer if fallback_answer else "I couldn't find relevant information in the document. Please try rephrasing your question."
        
        print(f"[DEBUG] Final answer ready, length: {len(final_answer)}")

        # ✅ Save to database
        db = SessionLocal()
        q = Question(doc_id=doc_id, user_email=user_email, question_text=question, answer_text=final_answer)
        db.add(q)
        db.commit()
        db.close()
        print(f"[DEBUG] Question saved to database")

        # ✅ Return response
        response = ChatResponse(
            query=question,
            answer=final_answer,
            citations=[],
            doc_id=doc_id,
            question=question,
            cached=False
        )
        print(f"[DEBUG] Returning response")
        return response

    except HTTPException:
        raise
    except Exception as e:
        print(f"[ERROR] Chat error: {e}")
        import traceback
        traceback.print_exc()
        return {
            "error": "Internal Server Error",
            "details": str(e),
            "doc_id": request.doc_id,
            "query": request.question,
            "question": request.question
        }

