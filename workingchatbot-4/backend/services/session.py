# services/session.py

from fastapi import HTTPException, Request
from typing import Optional, Dict
import uuid
import time

# In-memory session store (for production, use Redis or database)
SESSION_STORE: Dict[str, dict] = {}
SESSION_TIMEOUT = 3600 * 24 * 7  # 7 days in seconds

class SessionManager:
    @staticmethod
    def create_session(user_data: dict) -> str:
        """Create a new session and return session ID"""
        session_id = str(uuid.uuid4())
        SESSION_STORE[session_id] = {
            'user_data': user_data,
            'created_at': time.time(),
            'last_accessed': time.time()
        }
        return session_id
    
    @staticmethod
    def get_session(session_id: str) -> Optional[dict]:
        """Get session data by session ID"""
        if not session_id or session_id not in SESSION_STORE:
            return None
        
        session = SESSION_STORE[session_id]
        
        # Check if session has expired
        if time.time() - session['last_accessed'] > SESSION_TIMEOUT:
            del SESSION_STORE[session_id]
            return None
        
        # Update last accessed time
        session['last_accessed'] = time.time()
        return session['user_data']
    
    @staticmethod
    def delete_session(session_id: str) -> bool:
        """Delete a session"""
        if session_id in SESSION_STORE:
            del SESSION_STORE[session_id]
            return True
        return False
    
    @staticmethod
    def get_current_user(request: Request) -> Optional[dict]:
        """Get current user from session"""
        # Try to get session ID from cookie
        session_id = request.cookies.get('session_id')
        if not session_id:
            return None
        
        return SessionManager.get_session(session_id)

def require_authentication(request: Request) -> dict:
    """Dependency to require authentication"""
    user = SessionManager.get_current_user(request)
    if not user:
        raise HTTPException(status_code=401, detail="Authentication required")
    return user

def get_current_user_email(request: Request) -> str:
    """Get current user's email from session"""
    user = require_authentication(request)
    return user['email']