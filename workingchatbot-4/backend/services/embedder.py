import os
import uuid
import re
from langchain_community.document_loaders import PyPDFLoader, TextLoader
from langchain.text_splitter import RecursiveCharacterTextSplitter
from langchain_community.vectorstores import FAISS
from langchain_community.embeddings import HuggingFaceEmbeddings

def clean_text(text: str) -> str:
    """
    Clean up noisy content from raw document text.
    - Removes citations like [1], [2,3]
    - Removes excessive whitespace
    - Removes page numbers and headers
    """
    text = re.sub(r"\[\d+(,\s*\d+)*\]", "", text)  # Remove citation brackets
    text = re.sub(r"\s{3,}", " ", text)            # Collapse excessive spaces
    text = re.sub(r"Page\s*\d+", "", text, flags=re.IGNORECASE)  # Remove page numbers
    text = re.sub(r"\n{3,}", "\n\n", text)         # Collapse multiple line breaks
    return text.strip()

def embed_document(file_path: str):
    """
    Loads, cleans, chunks, embeds, and stores a document.
    Returns a unique doc_id and list of clean text chunks.
    """
    # Generate unique document ID
    doc_id = str(uuid.uuid4()).replace('-', '')[:8]

    # Load document
    if file_path.lower().endswith('.pdf'):
        loader = PyPDFLoader(file_path)
    else:
        loader = TextLoader(file_path, encoding='utf-8')

    documents = loader.load()

    # Clean each document page
    for doc in documents:
        doc.page_content = clean_text(doc.page_content)

    # Split into chunks
    splitter = RecursiveCharacterTextSplitter(
        chunk_size=1000,
        chunk_overlap=200,
        length_function=len,
    )
    chunks = splitter.split_documents(documents)

    # Filter out weak chunks
    filtered_chunks = [chunk for chunk in chunks if len(chunk.page_content.strip()) > 100]

    # Embed using HuggingFace
    embedder = HuggingFaceEmbeddings(model_name="sentence-transformers/all-MiniLM-L6-v2")
    vectorstore = FAISS.from_documents(filtered_chunks, embedder)

    # Save FAISS index
    os.makedirs("data/embeddings", exist_ok=True)
    vectorstore.save_local(f"data/embeddings/{doc_id}_index")

    # Return doc ID and clean chunk content
    text_chunks = [chunk.page_content for chunk in filtered_chunks]
    return doc_id, text_chunks
