from pydantic import BaseModel
from typing import Optional, List


class Message(BaseModel):
    role: str
    content: str


class ChatRequest(BaseModel):
    message: str
    history: List[Message] = []


class ChatResponse(BaseModel):
    reply: str


class KnowledgeCreate(BaseModel):
    category: str
    question: Optional[str] = None
    answer: str


class KnowledgeUpdate(BaseModel):
    category: Optional[str] = None
    question: Optional[str] = None
    answer: Optional[str] = None


class KnowledgeItem(BaseModel):
    id: int
    category: str
    question: Optional[str]
    answer: str
    created_at: str
