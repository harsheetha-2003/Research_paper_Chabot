#!/usr/bin/env python3
"""
Database initialization script to create tables with correct schema.
This ensures the database has the user_email column in the documents table.
"""

import os
import sys

# Add the backend directory to the path
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))

def init_database():
    """Initialize database with current schema"""
    try:
        from database.schema import Base, engine
        
        print("Creating database tables...")
        
        # Create all tables
        Base.metadata.create_all(bind=engine)
        
        print("✅ Database initialized successfully with current schema.")
        print("✅ All tables created including user_email column in documents table.")
        return True
        
    except Exception as e:
        print(f"❌ Error initializing database: {e}")
        return False

if __name__ == "__main__":
    print("🚀 Initializing database...")
    
    if init_database():
        print("🎉 Database is ready!")
    else:
        print("❌ Database initialization failed.")
        sys.exit(1)