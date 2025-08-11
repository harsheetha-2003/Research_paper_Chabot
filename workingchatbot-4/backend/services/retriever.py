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
        # ✅ Loosened regex to match section headers inline or with minimal formatting
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
        chunk_embedding = embedder.embed_documents([content])[0]
        score = sum([a * b for a, b in zip(query_embedding, chunk_embedding)])
        if score > best_score:
            best_score = score
            best_chunk = content
 
    if best_chunk:
        print("[DEBUG] Used semantic fallback matching.")
        return best_chunk.strip()
 
    # ✅ Fallback: try to extract last 1000 characters assuming conclusion is near the end
    print("[DEBUG] No section matched. Using end-of-document fallback.")
    return text[-1000:].strip()
 
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
        
        # ✅ Retrieve top matching documents
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
        
        # ✅ Combine all chunk content into one context
        full_context = "\n\n".join([doc.page_content for doc in docs])
        print(f"[DEBUG] Full context length: {len(full_context)} characters")
        
        # ✅ Apply section-aware filtering or semantic fallback
        filtered_context = get_relevant_section(full_context, query, chunks)
        print(f"[DEBUG] Filtered context length: {len(filtered_context)} characters")
        
        # ✅ Build answer
        text = filtered_context.strip()
        text = text.replace("\n", " ").replace("  ", " ")
        text = re.sub(r"\[\d+(,\d+)*\]", "", text)
        
        # ✅ Out-of-scope detection with better handling
        if len(text) < 50 or "not found" in text.lower():
            answer = "I couldn't find specific information about your question in the uploaded document. Please try rephrasing your question or ask about different aspects of the document."
        else:
            # Provide a more comprehensive answer
            answer = text[:1500] + "..." if len(text) > 1500 else text
        
        print(f"[DEBUG] Generated answer length: {len(answer)} characters")
        
        # ✅ Save to chat history
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