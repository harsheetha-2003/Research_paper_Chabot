# api/routes/table_of_contents.py

from fastapi import APIRouter, HTTPException, Query
from database.schema import SessionLocal, Document, TableOfContents, User
from services.toc_extractor import extract_table_of_contents
import os

router = APIRouter()

@router.get("/")
async def get_table_of_contents(
    doc_id: str = Query(..., description="Document ID to get table of contents for"),
    user_email: str = Query(..., description="Email of the user requesting table of contents")
):
    """Get table of contents for a document - only for document owner"""
    try:
        db = SessionLocal()
        
        # Validate user exists
        user = db.query(User).filter(User.email == user_email).first()
        if not user:
            db.close()
            raise HTTPException(status_code=404, detail="User not found")
        
        # Check if document exists and belongs to user
        document = db.query(Document).filter(
            Document.doc_id == doc_id,
            Document.user_email == user_email
        ).first()
        if not document:
            db.close()
            raise HTTPException(status_code=403, detail="Access denied. Document not found or you don't have permission to access it.")
        
        # Check if TOC already exists in database for this user
        existing_toc = db.query(TableOfContents).filter(
            TableOfContents.doc_id == doc_id,
            TableOfContents.user_email == user_email
        ).order_by(TableOfContents.id).all()
        
        if existing_toc:
            # Return existing TOC
            toc_data = []
            for entry in existing_toc:
                toc_data.append({
                    "section_number": entry.section_number,
                    "section_title": entry.section_title,
                    "level": entry.level
                })
            
            db.close()
            return {
                "doc_id": doc_id,
                "filename": document.filename,
                "table_of_contents": toc_data,
                "message": "Table of contents retrieved successfully"
            }
        
        # Generate new TOC if none exists
        # Read the document content
        if not os.path.exists(document.filepath):
            db.close()
            raise HTTPException(status_code=404, detail="Document file not found")
        
        # Read document content
        try:
            # Try to read as text first
            with open(document.filepath, 'r', encoding='utf-8') as f:
                doc_content = f.read()
        except UnicodeDecodeError:
            # For PDF or binary files, use placeholder content
            # In production, you'd integrate with your PDF text extraction
            doc_content = f"Document: {document.filename}\n\nThis is a binary document that requires text extraction."
        
        # Extract table of contents
        toc_entries = extract_table_of_contents(doc_content, doc_id)
        
        # Save TOC to database
        toc_data = []
        for entry in toc_entries:
            toc_record = TableOfContents(
                doc_id=doc_id,
                user_email=user_email,
                section_number=entry['section_number'],
                section_title=entry['section_title'],
                level=entry['level']
            )
            db.add(toc_record)
            
            toc_data.append({
                "section_number": entry['section_number'],
                "section_title": entry['section_title'],
                "level": entry['level']
            })
        
        db.commit()
        db.close()
        
        return {
            "doc_id": doc_id,
            "filename": document.filename,
            "table_of_contents": toc_data,
            "message": "Table of contents extracted and saved successfully"
        }
        
    except HTTPException:
        raise
    except Exception as e:
        print(f"Table of contents error: {e}")
        raise HTTPException(status_code=500, detail="Internal server error while extracting table of contents")