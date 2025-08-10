from sqlalchemy import Column, Integer, String, DateTime, create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
from datetime import datetime
import os

DATABASE_URL = "sqlite:///./data/db.sqlite3"

# ✅ Delete old DB if schema changed (only for dev/testing)
if not os.path.exists("data/db.sqlite3"):
    os.makedirs("data", exist_ok=True)

engine = create_engine(DATABASE_URL, connect_args={"check_same_thread": False})
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base = declarative_base()

class User(Base):
    __tablename__ = "users"
    id = Column(Integer, primary_key=True, index=True)
    first_name = Column(String, nullable=False)
    last_name = Column(String, nullable=False)
    email = Column(String, unique=True, index=True, nullable=False)
    password = Column(String, nullable=False)  # In production, this should be hashed
    created_at = Column(DateTime, default=datetime.utcnow)

class Document(Base):
    __tablename__ = "documents"
    id = Column(Integer, primary_key=True, index=True)
    doc_id = Column(String, unique=True, index=True)
    filename = Column(String, index=True)  # Removed unique constraint to allow same filename for different users
    filepath = Column(String)
    user_email = Column(String, index=True, nullable=False)  # Link document to user
    upload_date = Column(DateTime, default=datetime.utcnow)

class Question(Base):
    __tablename__ = "questions"
    id = Column(Integer, primary_key=True, index=True)
    doc_id = Column(String, index=True)
    user_email = Column(String, index=True, nullable=False)  # Link chat history to user
    question_text = Column(String)
    answer_text = Column(String)
    #created_at = Column(DateTime, default=datetime.utcnow)

class SuggestedQuestion(Base):
    __tablename__ = "suggested_questions"
    id = Column(Integer, primary_key=True, index=True)
    doc_id = Column(String, index=True)
    user_email = Column(String, index=True, nullable=False)  # Link suggested questions to user
    question_text = Column(String)
    created_at = Column(DateTime, default=datetime.utcnow)

class TableOfContents(Base):
    __tablename__ = "table_of_contents"
    id = Column(Integer, primary_key=True, index=True)
    doc_id = Column(String, index=True)
    user_email = Column(String, index=True, nullable=False)  # Link table of contents to user
    section_number = Column(String)
    section_title = Column(String)
    level = Column(Integer)  # 1 for main sections, 2 for subsections, etc.
    created_at = Column(DateTime, default=datetime.utcnow)
