import re
from langchain_community.vectorstores import FAISS
from langchain_community.embeddings import HuggingFaceEmbeddings
from services.chat_history import save_chat_entry

# ✅ Section-aware filtering logic with expanded synonyms
SECTION_HEADERS = {
    "methods": ["materials and methods", "methodology", "experimental procedures"],
    "results": ["results", "findings", "key findings", "observations"],
    "conclusion": ["conclusion", "conclusions", "summary", "final thoughts", "takeaways", "closing remarks"],
    "analysis": ["nutrient composition analysis", "data analysis", "statistical analysis"]
}

def get_relevant_section(text, query, chunks):
    query_lower = query.lower()
    matched_section = None

    for section, keywords in SECTION_HEADERS.items():
        if any(keyword in query_lower for keyword in keywords):
            matched_section = section
            break

    if matched_section:
        pattern = r"(?i)(" + "|".join(SECTION_HEADERS[matched_section]) + r")[^\n]{0,100}([\s\S]{0,1500})"
        match = re.search(pattern, text)
        if match:
            print(f"[DEBUG] Matched section: {matched_section}")
            return match.group(2).strip()

    # ✅ Semantic fallback: find most relevant chunk
    embedder = HuggingFaceEmbeddings(model_name="sentence-transformers/all-MiniLM-L6-v2")
    query_embedding = embedder.embed_query(query)

    best_score = -1
    best_chunk = None
    for chunk in chunks:
        content = chunk.get("content", "")
        if len(content.strip()) < 100:
            continue  # Skip weak chunks
        chunk_embedding = embedder.embed_documents([content])[0]
        score = sum([a * b for a, b in zip(query_embedding, chunk_embedding)])
        print(f"[DEBUG] Chunk score: {score:.4f}")
        if score > best_score:
            best_score = score
            best_chunk = content

    if best_chunk and best_score > 0.3:
        print("[DEBUG] Used semantic fallback matching.")
        return best_chunk.strip()

    print("[DEBUG] No strong semantic match. Using end-of-document fallback.")
    return text[-2000:].strip()

def retrieve_chunks(doc_id, query, exact_match=False):
    try:
        print(f"[DEBUG] Starting retrieval for doc_id: {doc_id}, query: {query[:50]}...")
        embedder = HuggingFaceEmbeddings(model_name="sentence-transformers/all-MiniLM-L6-v2")

        embedding_path = f"data/embeddings/{doc_id}_index"
        print(f"[DEBUG] Loading embeddings from: {embedding_path}")

        vectorstore = FAISS.load_local(
            embedding_path,
            embedder,
            allow_dangerous_deserialization=True
        )

        print("[DEBUG] Performing similarity search...")
        docs = vectorstore.similarity_search(query, k=15)
        print(f"[DEBUG] Found {len(docs)} similar documents")

        chunks = [
            {
                "content": doc.page_content,
                "metadata": doc.metadata
            }
            for doc in docs
        ]

        full_context = "\n\n".join([doc.page_content for doc in docs])
        print(f"[DEBUG] Full context length: {len(full_context)} characters")

        filtered_context = get_relevant_section(full_context, query, chunks)
        print(f"[DEBUG] Filtered context length: {len(filtered_context)} characters")

        context = filtered_context.strip()
        context = re.sub(r"\[\d+(,\d+)*\]", "", context)
        context = re.sub(r'\n\s*\n\s*\n+', '\n\n', context)
        context = re.sub(r' {3,}', ' ', context)
        context = context.strip()

        print(f"[DEBUG] Context preview:\n{context[:500]}...\n--- End Preview ---")

        if len(context) < 50 or "not found" in context.lower():
            answer = "I couldn't find specific information about your question in the uploaded document. Please try rephrasing your question or ask about different aspects of the document."
        else:
            from orchestrator import generate_answer

            prompt = f"""You are an expert research analyst. Your task is to provide comprehensive, professional responses based on the document content. 

IMPORTANT INSTRUCTIONS:
- DO NOT simply copy or extract text fragments from the document
- Write in complete, flowing sentences that connect ideas logically
- Synthesize information from the context into coherent explanations
- Use professional academic language as if you are explaining to a colleague
- Create smooth transitions between concepts and maintain narrative flow
- For summaries, provide an overview that captures the main themes, methodology, findings, and conclusions
- Structure longer answers into clear paragraphs with logical progression
- Use bullet points only for lists when questions explicitly ask to "List" or "Name" items
- For section-specific questions, synthesize and explain the content rather than just extracting it

Document Context:
{context}

Question: {query}

Provide a comprehensive, professionally written response that synthesizes the information into a coherent explanation:"""

            try:
                print(f"[DEBUG] Sending prompt to LLM, context length: {len(context)}")
                answer = generate_answer(prompt)
                print(f"[DEBUG] LLM response received, length: {len(answer) if answer else 0}")

                if not answer or answer.startswith(("🚫", "⚠️", "Sorry")) or len(answer.strip()) < 20:
                    print(f"[WARNING] LLM failed or returned invalid response: {answer[:100] if answer else 'None'}")
                    answer = "I apologize, but I encountered an issue generating a proper response from the document. Please try rephrasing your question or ask about a specific aspect of the document."
                else:
                    print(f"[DEBUG] LLM response appears valid")

            except Exception as e:
                print(f"[ERROR] LLM generation failed: {e}")
                answer = "I apologize, but I encountered a technical issue while processing your question. Please try asking your question again."

        print(f"[DEBUG] Generated answer length: {len(answer)} characters")

        save_chat_entry(doc_id, query, answer)
        print("[DEBUG] Chat entry saved successfully")

        return {
            "chunks": chunks,
            "answer": answer
        }

    except FileNotFoundError as e:
        print(f"[ERROR] Embeddings not found for doc_id {doc_id}: {e}")
        return {
            "chunks": [],
            "answer": "The document embeddings could not be found. Please re-upload the document and try again."
        }
    except Exception as e:
        print(f"[ERROR] Retrieval failed for doc_id {doc_id}: {e}")
        return {
            "chunks": [],
            "answer": "An error occurred while processing your question. Please try again or contact support if the issue persists."
        }
