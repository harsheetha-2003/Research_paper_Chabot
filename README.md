# 📄 Research Paper AI Chatbot

An AI-powered web application that enables users to upload research papers and ask questions in natural language using Retrieval-Augmented Generation (RAG).

---

## Problem Statement

Research papers are often long and difficult to navigate. Finding specific information requires manually reading multiple sections, making literature review and knowledge extraction time-consuming.

This project was developed to simplify research paper exploration by allowing users to interact with uploaded documents through natural language questions.

---

## Solution

The application processes uploaded PDF research papers, converts them into semantic embeddings, retrieves the most relevant content using FAISS, and generates context-aware answers using Large Language Models (LLMs).

The project includes a complete web application with user authentication, document upload, conversational search, and AI-powered question answering.

---

## Features

- User registration and login
- Upload research papers (PDF)
- AI-powered question answering
- Retrieval-Augmented Generation (RAG)
- Semantic document search
- Context-aware responses
- Conversation history
- Multiple LLM support
- Clean web interface

---

## Tech Stack

### Frontend
- JavaScript
- HTML
- CSS

### Backend
- Python
- FastAPI
- SQLAlchemy
- SQLite

### AI & NLP
- LangChain
- FAISS
- Sentence Transformers
- Claude API
- OpenRouter API

---

## Workflow

1. User uploads a research paper.
2. The document is parsed and divided into chunks.
3. Sentence embeddings are generated.
4. FAISS indexes the embeddings.
5. The most relevant document chunks are retrieved.
6. Retrieved context is sent to the LLM.
7. The chatbot generates an answer grounded in the uploaded document.

---

## Skills Demonstrated

- Retrieval-Augmented Generation (RAG)
- AI Application Development
- Natural Language Processing
- Semantic Search
- FastAPI Backend Development
- REST API Development
- Vector Databases (FAISS)
- Prompt Engineering
- Full-Stack Application Development
- User Authentication

---

## Folder Structure

```
workingchatbot-4/
│
├── backend/
├── frontend/
├── data/
├── requirements.txt
├── migrate_database.py
├── start.py
└── start_dev.sh
```

---

## Future Improvements

- Multi-document search
- Source citation highlighting
- OCR support for scanned PDFs
- Cloud deployment (AWS)
- Streaming responses
- Role-based access control

---

## Author

**Harsheetha V P**

Applied AI Engineer | AI Solutions | Python
