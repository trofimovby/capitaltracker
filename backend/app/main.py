from fastapi import FastAPI, Depends, HTTPException
from sqlalchemy.orm import Session
from . import models, schemas, crud
from .database import SessionLocal, engine, get_db

models.Base.metadata.create_all(bind=engine)

app = FastAPI()

@app.post("/users/", response_model=schemas.User)
def create_user(user: schemas.UserCreate, db: Session = Depends(get_db)):
    return crud.create_user(db=db, user=user)

@app.get("/users/{user_id}", response_model=schemas.User)
def read_user(user_id: int, db: Session = Depends(get_db)):
    db_user = crud.get_user(db, user_id=user_id)
    if db_user is None:
        raise HTTPException(status_code=404, detail="User not found")
    return db_user

@app.post("/users/{user_id}/transactions/", response_model=schemas.Transaction)
def create_transaction_for_user(
    user_id: int, transaction: schemas.TransactionCreate, db: Session = Depends(get_db)
):
    return crud.create_transaction(db=db, transaction=transaction, user_id=user_id)

@app.get("/users/{user_id}/transactions/", response_model=list[schemas.Transaction])
def read_transactions(user_id: int, db: Session = Depends(get_db)):
    return crud.get_transactions(db, user_id=user_id)
