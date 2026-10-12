from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, declarative_base
import os

# .env file se URL read karega, agar nahi miley gi to default lagaye ga
DATABASE_URL = os.getenv("DATABASE_URL", "postgresql://taskuser:taskpassword@db:5432/taskdb")

engine = create_engine(DATABASE_URL)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()

# Database session create karne ka function
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
