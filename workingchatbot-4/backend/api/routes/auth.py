# api/routes/auth.py

from fastapi import APIRouter, HTTPException, Query, Response, Request
from pydantic import BaseModel
from database.schema import SessionLocal, User, Document, Question, SuggestedQuestion, TableOfContents
from services.chat_history import _get_history_path
from services.session import SessionManager, require_authentication, get_current_user_email, SESSION_TIMEOUT
from datetime import datetime
import os
import shutil

router = APIRouter()

class RegisterRequest(BaseModel):
    first_name: str
    last_name: str
    email: str
    password: str

class LoginRequest(BaseModel):
    email: str
    password: str

class UserResponse(BaseModel):
    id: int
    first_name: str
    last_name: str
    email: str
    created_at: datetime

@router.post("/register")
async def register_user(request: RegisterRequest):
    """Register a new user"""
    try:
        db = SessionLocal()
        
        # Check if user already exists
        existing_user = db.query(User).filter(User.email == request.email).first()
        if existing_user:
            db.close()
            raise HTTPException(status_code=400, detail="Email already registered")
        
        # Create new user
        new_user = User(
            first_name=request.first_name,
            last_name=request.last_name,
            email=request.email,
            password=request.password  # Note: In production, hash the password
        )
        
        db.add(new_user)
        db.commit()
        db.refresh(new_user)
        db.close()
        
        return {
            "message": "User registered successfully",
            "user": {
                "id": new_user.id,
                "first_name": new_user.first_name,
                "last_name": new_user.last_name,
                "email": new_user.email,
                "created_at": new_user.created_at
            }
        }
        
    except HTTPException:
        raise
    except Exception as e:
        print(f"Registration error: {e}")
        raise HTTPException(status_code=500, detail="Internal server error during registration")

@router.post("/login")
async def login_user(request: LoginRequest, response: Response):
    """Login user with email and password"""
    try:
        db = SessionLocal()
        
        # Find user by email
        user = db.query(User).filter(User.email == request.email).first()
        if not user:
            db.close()
            raise HTTPException(status_code=401, detail="Invalid email or password")
        
        # Check password (in production, compare hashed passwords)
        if user.password != request.password:
            db.close()
            raise HTTPException(status_code=401, detail="Invalid email or password")
        
        # Create session
        user_data = {
            "id": user.id,
            "first_name": user.first_name,
            "last_name": user.last_name,
            "email": user.email,
            "created_at": user.created_at.isoformat()
        }
        session_id = SessionManager.create_session(user_data)
        
        # Set session cookie
        response.set_cookie(
            key="session_id",
            value=session_id,
            max_age=SESSION_TIMEOUT,
            httponly=True,
            samesite="lax"
        )
        
        db.close()
        
        return {
            "message": "Login successful",
            "user": user_data
        }
        
    except HTTPException:
        raise
    except Exception as e:
        print(f"Login error: {e}")
        raise HTTPException(status_code=500, detail="Internal server error during login")

@router.post("/logout")
async def logout_user(request: Request, response: Response):
    """Logout user and clear session"""
    try:
        session_id = request.cookies.get('session_id')
        if session_id:
            SessionManager.delete_session(session_id)
        
        # Clear session cookie
        response.delete_cookie(key="session_id")
        
        return {"message": "Logout successful"}
        
    except Exception as e:
        print(f"Logout error: {e}")
        raise HTTPException(status_code=500, detail="Internal server error during logout")

@router.get("/me")
async def get_current_user(request: Request):
    """Get current authenticated user info"""
    user = require_authentication(request)
    return {"user": user}

@router.get("/users")
async def view_users():
    """View all registered users"""
    try:
        db = SessionLocal()
        users = db.query(User).all()
        db.close()
        
        return {
            "message": "Users retrieved successfully",
            "users": [
                {
                    "id": user.id,
                    "first_name": user.first_name,
                    "last_name": user.last_name,
                    "email": user.email,
                    "created_at": user.created_at
                }
                for user in users
            ]
        }
        
    except Exception as e:
        print(f"View users error: {e}")
        raise HTTPException(status_code=500, detail="Internal server error while retrieving users")

@router.delete("/user")
async def delete_user(user_email: str = Query(..., description="Email of the user to delete")):
    """Delete user and all associated data (documents, chat history, etc.)"""
    try:
        db = SessionLocal()
        
        # Find user
        user = db.query(User).filter(User.email == user_email).first()
        if not user:
            db.close()
            raise HTTPException(status_code=404, detail="User not found")
        
        # Get all documents for this user
        user_documents = db.query(Document).filter(Document.user_email == user_email).all()
        
        deleted_files = 0
        deleted_embeddings = 0
        deleted_history_files = 0
        
        # Delete all user's documents and associated data
        for doc in user_documents:
            doc_id = doc.doc_id
            
            # Delete chat history file
            history_path = _get_history_path(doc_id)
            if os.path.exists(history_path):
                os.remove(history_path)
                deleted_history_files += 1
            
            # Delete uploaded file
            if doc.filepath and os.path.exists(doc.filepath):
                os.remove(doc.filepath)
                deleted_files += 1
            
            # Delete embeddings index
            embeddings_path = f"data/embeddings/{doc_id}_index"
            if os.path.exists(embeddings_path):
                shutil.rmtree(embeddings_path)
                deleted_embeddings += 1
        
        # Delete database records in correct order (foreign key constraints)
        # Delete questions/chat history for user
        deleted_questions = db.query(Question).filter(Question.user_email == user_email).delete()
        
        # Delete suggested questions for user
        deleted_suggested = db.query(SuggestedQuestion).filter(SuggestedQuestion.user_email == user_email).delete()
        
        # Delete table of contents for user
        deleted_toc = db.query(TableOfContents).filter(TableOfContents.user_email == user_email).delete()
        
        # Delete documents for user
        deleted_documents = db.query(Document).filter(Document.user_email == user_email).delete()
        
        # Finally delete user
        db.delete(user)
        db.commit()
        db.close()
        
        return {
            "message": "User and all associated data deleted successfully",
            "user_email": user_email,
            "user_name": f"{user.first_name} {user.last_name}",
            "deleted_documents": deleted_documents,
            "deleted_questions": deleted_questions,
            "deleted_suggested_questions": deleted_suggested,
            "deleted_table_of_contents": deleted_toc,
            "deleted_files": deleted_files,
            "deleted_embeddings": deleted_embeddings,
            "deleted_history_files": deleted_history_files
        }
        
    except HTTPException:
        raise
    except Exception as e:
        print(f"Delete user error: {e}")
        raise HTTPException(status_code=500, detail="Internal server error while deleting user")