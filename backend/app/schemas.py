from pydantic import BaseModel
from datetime import date
from typing import List

class TransactionBase(BaseModel):
    amount: float
    type: str
    category: str
    date: date
    description: str

class TransactionCreate(TransactionBase):
    pass

class Transaction(TransactionBase):
    id: int
    user_id: int

    class Config:
        orm_mode = True

class UserBase(BaseModel):
    username: str
    email: str

class UserCreate(UserBase):
    password: str

class User(UserBase):
    id: int
    transactions: List[Transaction] = []

    class Config:
        orm_mode = True
