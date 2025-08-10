# api/routes/suggested_questions.py

from fastapi import APIRouter, HTTPException, Query
from database.schema import SessionLocal, Document, Question, SuggestedQuestion, User
from services.chat_history import load_chat_history
from services.question_generator import generate_suggested_questions
import os

router = APIRouter()

@router.get("/")
async def get_suggested_questions(
    doc_id: str = Query(..., description="Document ID to get suggested questions for"),
    user_email: str = Query(..., description="Email of the user requesting suggested questions")
):
    """Get suggested questions for a document (only if no chat history exists) - only for document owner"""
    try:
        db = SessionLocal()
        
        # Validate user exists
        user = db.query(User).filter(User.email == user_email).first()
        if not user:
            db.close()
            raise HTTPException(status_code=404, detail="User not found")
        
        # Check if document exists and belongs to user
        document = db.query(Document).filter(
            Document.doc_id == doc_id,
            Document.user_email == user_email
        ).first()
        if not document:
            db.close()
            raise HTTPException(status_code=403, detail="Access denied. Document not found or you don't have permission to access it.")
        
        # Check if there are any existing questions/answers in the database for this user
        existing_questions = db.query(Question).filter(
            Question.doc_id == doc_id,
            Question.user_email == user_email
        ).count()
        if existing_questions > 0:
            db.close()
            raise HTTPException(status_code=400, detail="Questions not available - chat history exists for this document")
        
        # Check if there's chat history in the file system
        chat_history = load_chat_history(doc_id)
        if len(chat_history) > 0:
            db.close()
            raise HTTPException(status_code=400, detail="Questions not available - chat history exists for this document")
        
        # Check if suggested questions already exist for this document and user
        existing_suggested = db.query(SuggestedQuestion).filter(
            SuggestedQuestion.doc_id == doc_id,
            SuggestedQuestion.user_email == user_email
        ).all()
        
        if existing_suggested:
            # Return existing suggested questions
            questions = [sq.question_text for sq in existing_suggested]
            db.close()
            return {
                "doc_id": doc_id,
                "filename": document.filename,
                "suggested_questions": questions,
                "message": "Suggested questions retrieved successfully"
            }
        
        # Generate new suggested questions if none exist
        # Read the document content
        if not os.path.exists(document.filepath):
            db.close()
            raise HTTPException(status_code=404, detail="Document file not found")
        
        # Read document content (assuming it's text-based or we can extract text)
        try:
            # For simplicity, try to read as text first
            with open(document.filepath, 'r', encoding='utf-8') as f:
                doc_content = f.read()
        except UnicodeDecodeError:
            # If it's a PDF or binary file, we need to extract text differently
            # For now, we'll use a placeholder - in production, you'd use the same
            # text extraction logic from your document processor
            doc_content = f"Document: {document.filename}"
        
        # Generate suggested questions
        suggested_questions = generate_suggested_questions(doc_content, doc_id)
        
        # Save suggested questions to database
        for question_text in suggested_questions:
            suggested_q = SuggestedQuestion(doc_id=doc_id, user_email=user_email, question_text=question_text)
            db.add(suggested_q)
        
        db.commit()
        db.close()
        
        return {
            "doc_id": doc_id,
            "filename": document.filename,
            "suggested_questions": suggested_questions,
            "message": "Suggested questions generated and saved successfully"
        }
        
    except HTTPException:
        raise
    except Exception as e:
        print(f"Suggested questions error: {e}")
        raise HTTPException(status_code=500, detail="Internal server error while getting suggested questions")