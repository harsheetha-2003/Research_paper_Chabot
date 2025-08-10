# api/routes/upload.py

from fastapi import APIRouter, UploadFile, File, HTTPException, Request
from services.embedder import embed_document
from services.session import get_current_user_email
from database.schema import SessionLocal, Document, User
import os

from database.schema import engine
print("🔍 App is using DB:", engine.url)

router = APIRouter()
UPLOAD_DIR = "data/uploads"

@router.post("/")
async def upload_file(request: Request, file: UploadFile = File(...)):
    try:
        # Get user email from session (automatically authenticated)
        user_email = get_current_user_email(request)
        
        # Validate that user exists
        db = SessionLocal()
        user = db.query(User).filter(User.email == user_email).first()
        if not user:
            db.close()
            raise HTTPException(status_code=404, detail="User not found. Please register first.")
        
        os.makedirs(UPLOAD_DIR, exist_ok=True)
        filename = file.filename or "unknown_file"
        file_path = os.path.join(UPLOAD_DIR, filename)

        # Save file to disk
        with open(file_path, "wb") as f:
            content = await file.read()
            f.write(content)

        # Embed document and get doc_id + chunks
        doc_id, chunks = embed_document(file_path)

        # ✅ Check for duplicate filename for this specific user
        existing = db.query(Document).filter(
            Document.filename == filename,
            Document.user_email == user_email
        ).first()
        if existing:
            db.close()
            return {
                "error": "You have already uploaded a file with this filename.",
                "filename": filename,
                "doc_id": existing.doc_id
            }

        # Insert new document metadata with user association
        doc = Document(
            doc_id=doc_id, 
            filename=filename, 
            filepath=file_path,
            user_email=user_email
        )
        db.add(doc)
        db.commit()
        db.close()

        full_text = "\n\n".join(chunks)

        return {
            "message": "Upload successful. Document parsed and embedded.",
            "doc_id": doc_id,
            "filename": filename,
            "user_email": user_email,
            "content": full_text,
            "status": "LLM is ready to chat using this document."
        }

    except HTTPException:
        raise
    except Exception as e:
        print(f"Upload error: {e}")
        return {"error": str(e)}
