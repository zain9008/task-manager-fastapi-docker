from fastapi import FastAPI, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List
from .database import engine, Base, get_db
from . import models, schemas

app = FastAPI(title="Task Manager API")

# App start hote hi database me tables create karne ke liye
@app.on_event("startup")
def startup():
    Base.metadata.create_all(bind=engine)

# 1. Health Check Endpoint (Bonus)
@app.get("/health", status_code=status.HTTP_200_OK)
def health_check():
    return {"status": "healthy"}

# 2. CREATE Task
@app.post("/tasks", response_model=schemas.TaskResponse, status_code=status.HTTP_201_CREATED)
def create_task(task: schemas.TaskCreate, db: Session = Depends(get_db)):
    db_task = models.Task(**task.model_dump())
    db.add(db_task)
    db.commit()
    db.refresh(db_task)
    return db_task

# 3. GET All Tasks
@app.get("/tasks", response_model=List[schemas.TaskResponse])
def get_all_tasks(db: Session = Depends(get_db)):
    return db.query(models.Task).all()

# 4. GET Task by ID
@app.get("/tasks/{task_id}", response_model=schemas.TaskResponse)
def get_task(task_id: int, db: Session = Depends(get_db)):
    db_task = db.query(models.Task).filter(models.Task.id == task_id).first()
    if not db_task:
        raise HTTPException(status_code=404, detail="Task not found")
    return db_task

# 5. UPDATE Task
@app.put("/tasks/{task_id}", response_model=schemas.TaskResponse)
def update_task(task_id: int, updated_task: schemas.TaskCreate, db: Session = Depends(get_db)):
    db_task = db.query(models.Task).filter(models.Task.id == task_id).first()
    if not db_task:
        raise HTTPException(status_code=404, detail="Task not found")
    
    for key, value in updated_task.model_dump().items():
        setattr(db_task, key, value)
        
    db.commit()
    db.refresh(db_task)
    return db_task

# 6. DELETE Task
@app.delete("/tasks/{task_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_task(task_id: int, db: Session = Depends(get_db)):
    db_task = db.query(models.Task).filter(models.Task.id == task_id).first()
    if not db_task:
        raise HTTPException(status_code=404, detail="Task not found")
    
    db.delete(db_task)
    db.commit()
    return None
