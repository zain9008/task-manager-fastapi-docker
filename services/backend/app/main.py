from fastapi import FastAPI, Depends, HTTPException, status
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy import inspect, text
from sqlalchemy.orm import Session
from typing import List
from .database import engine, Base, get_db, SessionLocal
from . import models, schemas

app = FastAPI(title="Task Manager API")

# 🔒 CORS Middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:8080"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# App startup handler to create and seed tables
@app.on_event("startup")
def startup():
    Base.metadata.create_all(bind=engine)

    # create_all does not add columns to tables that already exist.
    if "is_deleted" not in {column["name"] for column in inspect(engine).get_columns("tasks")}:
        with engine.begin() as connection:
            connection.execute(
                text("ALTER TABLE tasks ADD COLUMN is_deleted BOOLEAN NOT NULL DEFAULT FALSE")
            )
    
    # Database seeding logic
    db = SessionLocal()
    try:
        if db.query(models.Task).count() == 0:
            sample_tasks = [
                models.Task(title="Learn Docker", description="Understand containers and images", completed=True),
                models.Task(title="Build FastAPI CRUD", description="Create APIs for Task Manager", completed=False),
                models.Task(title="Add React Frontend", description="Setup modern React with Vite", completed=False)
            ]
            db.add_all(sample_tasks)
            db.commit()
    finally:
        db.close()

# --- API ENDPOINTS ---

@app.get("/health", status_code=status.HTTP_200_OK)
def health_check():
    return {"status": "healthy"}

@app.post("/tasks", response_model=schemas.TaskResponse, status_code=status.HTTP_201_CREATED)
def create_task(task: schemas.TaskCreate, db: Session = Depends(get_db)):
    db_task = models.Task(**task.model_dump())
    db.add(db_task)
    db.commit()
    db.refresh(db_task)
    return db_task

@app.get("/tasks", response_model=List[schemas.TaskResponse])
def get_all_tasks(db: Session = Depends(get_db)):
    return (
        db.query(models.Task)
        .filter(models.Task.is_deleted == False)
        .order_by(models.Task.id)
        .all()
    )

@app.get("/tasks/{task_id}", response_model=schemas.TaskResponse)
def get_task(task_id: int, db: Session = Depends(get_db)):
    db_task = db.query(models.Task).filter(models.Task.id == task_id, models.Task.is_deleted == False).first()
    if not db_task:
        raise HTTPException(status_code=404, detail="Task not found")
    return db_task

@app.put("/tasks/{task_id}", response_model=schemas.TaskResponse)
def update_task(task_id: int, updated_task: schemas.TaskCreate, db: Session = Depends(get_db)):
    db_task = db.query(models.Task).filter(models.Task.id == task_id, models.Task.is_deleted == False).first()
    if not db_task:
        raise HTTPException(status_code=404, detail="Task not found")
    
    for key, value in updated_task.model_dump().items():
        setattr(db_task, key, value)
        
    db.commit()
    db.refresh(db_task)
    return db_task

@app.delete("/tasks/{task_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_task(task_id: int, db: Session = Depends(get_db)):
    db_task = db.query(models.Task).filter(models.Task.id == task_id, models.Task.is_deleted == False).first()
    if not db_task:
        raise HTTPException(status_code=404, detail="Task not found")
    
    db_task.is_deleted = True
    db.commit()
    return None
