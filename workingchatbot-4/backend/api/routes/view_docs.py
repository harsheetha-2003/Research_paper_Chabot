# from fastapi import APIRouter
# from database.schema import SessionLocal, Document

# router = APIRouter()

# @router.get("/")
# async def list_documents():
#     db = SessionLocal()
#     docs = db.query(Document).all()
#     db.close()

#     return [
#         {
#             "doc_id": doc.doc_id,
#             "filename": doc.filename,
#             "upload_date": doc.upload_date.strftime("%Y-%m-%d %H:%M:%S"),
#             "chat_link": f"/chat?doc_id={doc.doc_id}"  # ✅ Link to chat
#         }
#         for doc in docs
#     ]
# api/routes/view_docs.py

from fastapi import APIRouter, HTTPException, Request
from database.schema import SessionLocal, Document, User
from services.session import get_current_user_email

router = APIRouter()

@router.get("/")
async def list_documents(request: Request):
    """List documents uploaded by the current authenticated user"""
    try:
        # Get user email from session (automatically authenticated)
        user_email = get_current_user_email(request)
        
        db = SessionLocal()
        
        # Validate that user exists
        user = db.query(User).filter(User.email == user_email).first()
        if not user:
            db.close()
            raise HTTPException(status_code=404, detail="User not found")
        
        # Get documents for this user only
        docs = db.query(Document).filter(Document.user_email == user_email).all()
        db.close()

        if not docs:
            return {"message": "User has not uploaded any documents", "documents": []}

        return [
            {
                "doc_id": doc.doc_id,
                "filename": doc.filename,
                "user_email": doc.user_email,
                "upload_date": doc.upload_date.strftime("%Y-%m-%d %H:%M:%S"),
                "chat_history_link": f"/chat-history?doc_id={doc.doc_id}"  # ✅ Link to chat history
            }
            for doc in docs
        ]
    
    except HTTPException:
        raise
    except Exception as e:
        print(f"List documents error: {e}")
        # Check if it's a database column error and provide better handling
        if "no such column" in str(e).lower():
            print("Database schema mismatch detected. Please run database migration.")
            raise HTTPException(status_code=500, detail="Database needs migration. Please contact administrator.")
        raise HTTPException(status_code=500, detail="Internal server error while listing documents")

