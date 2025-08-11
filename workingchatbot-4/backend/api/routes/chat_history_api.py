# # api/routes/chat_history_api.py

# from fastapi import APIRouter, Query, HTTPException
# from services.chat_history import load_chat_history
# from database.schema import SessionLocal, Document, User

# router = APIRouter()

# @router.get("/chat-history")
# async def get_chat_history(
#     doc_id: str = Query(..., description="Document ID to get chat history for"),
#     user_email: str = Query(..., description="Email of the user requesting chat history")
# ):
#     """Get chat history for a specific document - only for document owner"""
#     try:
#         db = SessionLocal()
        
#         # Validate user exists
#         user = db.query(User).filter(User.email == user_email).first()
#         if not user:
#             db.close()
#             raise HTTPException(status_code=404, detail="User not found")
        
#         # Validate user has access to this document
#         document = db.query(Document).filter(
#             Document.doc_id == doc_id,
#             Document.user_email == user_email
#         ).first()
#         if not document:
#             db.close()
#             raise HTTPException(status_code=403, detail="Access denied. Document not found or you don't have permission to access it.")
        
#         db.close()
        
#         history = load_chat_history(doc_id)
#         return {
#             "doc_id": doc_id,
#             "user_email": user_email,
#             "chat_history": history
#         }
        
#     except HTTPException:
#         raise
#     except Exception as e:
#         print(f"Get chat history error: {e}")
#         raise HTTPException(status_code=500, detail="Internal server error while retrieving chat history")
# api/routes/chat_history_api.py
# api/routes/chat_history_api.py

from fastapi import APIRouter, Query, HTTPException, Request
from services.chat_history import load_chat_history
from database.schema import SessionLocal, Document, User
from services.session import get_current_user_email

router = APIRouter()

@router.get("/chat-history")
async def get_chat_history(
    request: Request,
    doc_id: str = Query(..., description="Document ID to get chat history for")
):
    """Get chat history for a specific document - only for document owner"""
    try:
        # Get user email from session (requires authentication)
        user_email = get_current_user_email(request)
        
        db = SessionLocal()
        
        # Validate user exists
        user = db.query(User).filter(User.email == user_email).first()
        if not user:
            db.close()
            raise HTTPException(status_code=404, detail="User not found")
        
        # Validate user has access to this document
        document = db.query(Document).filter(
            Document.doc_id == doc_id,
            Document.user_email == user_email
        ).first()
        if not document:
            db.close()
            raise HTTPException(status_code=403, detail="Access denied. Document not found or you don't have permission to access it.")
        
        db.close()
        
        history = load_chat_history(doc_id)
        return {
            "doc_id": doc_id,
            "user_email": user_email,
            "chat_history": history
        }
        
    except HTTPException:
        raise
    except Exception as e:
        print(f"Get chat history error: {e}")
        raise HTTPException(status_code=500, detail="Internal server error while retrieving chat history")
