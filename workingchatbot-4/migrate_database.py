#!/usr/bin/env python3
"""
Database migration script to add user_email column to existing documents table.
This script safely updates the database schema to support user-specific documents.
"""

import sqlite3
import os
import sys
from pathlib import Path

def migrate_database():
    """Add user_email column to documents table if it doesn't exist"""
    
    # Find the database file
    db_paths = [
        "./backend/data/db.sqlite3"
    ]
    
    db_path = None
    for path in db_paths:
        if os.path.exists(path):
            db_path = path
            break
    
    if not db_path:
        print("❌ Database file not found. Creating new database...")
        # Create the data directory if it doesn't exist
        os.makedirs("data", exist_ok=True)
        db_path = "./data/db.sqlite3"
    
    print(f"📁 Using database: {db_path}")
    
    try:
        # Connect to database
        conn = sqlite3.connect(db_path)
        cursor = conn.cursor()
        
        # Check if documents table exists and what columns it has
        cursor.execute("SELECT sql FROM sqlite_master WHERE type='table' AND name='documents';")
        result = cursor.fetchone()
        
        if not result:
            print("📋 Documents table doesn't exist. Will be created by the application.")
            conn.close()
            return True
        
        table_schema = result[0]
        print(f"📋 Current documents table schema: {table_schema}")
        
        # Check if user_email column already exists
        if 'user_email' in table_schema:
            print("✅ user_email column already exists in documents table.")
            conn.close()
            return True
        
        print("🔧 Adding user_email column to documents table...")
        
        # Add the user_email column
        cursor.execute("ALTER TABLE documents ADD COLUMN user_email TEXT;")
        
        # Create index for the new column
        cursor.execute("CREATE INDEX IF NOT EXISTS ix_documents_user_email ON documents (user_email);")
        
        # Commit changes
        conn.commit()
        
        print("✅ Successfully added user_email column to documents table.")
        
        # Verify the change
        cursor.execute("PRAGMA table_info(documents);")
        columns = cursor.fetchall()
        print("📋 Updated table structure:")
        for col in columns:
            print(f"  - {col[1]} ({col[2]})")
        
        conn.close()
        return True
        
    except Exception as e:
        print(f"❌ Error during migration: {e}")
        if 'conn' in locals():
            conn.close()
        return False

def recreate_database():
    """Recreate the database from scratch using the current schema"""
    print("🔄 Recreating database from current schema...")
    
    try:
        # Import the schema and create tables
        sys.path.append('./backend')
        from database.schema import Base, engine
        
        # Create all tables
        Base.metadata.create_all(bind=engine)
        
        print("✅ Database recreated successfully with current schema.")
        return True
        
    except Exception as e:
        print(f"❌ Error recreating database: {e}")
        return False

if __name__ == "__main__":
    print("🚀 Starting database migration...")
    
    # Try migration first
    if migrate_database():
        print("✅ Migration completed successfully!")
    else:
        print("⚠️ Migration failed. Attempting to recreate database...")
        if recreate_database():
            print("✅ Database recreation completed successfully!")
        else:
            print("❌ Database recreation failed. Manual intervention required.")
            sys.exit(1)
    
    print("🎉 Database is ready for user-specific document management!")