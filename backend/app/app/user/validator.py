from typing import Optional

from sqlalchemy.orm import Session

from .models import User


async def verify_username_exist(username: str, db_session: Session) -> Optional[User]:
    return db_session.query(User).filter(User.username == username).first()

async def verify_user_exist(user_id: int, db_session: Session) -> Optional[User]:
    return db_session.query(User).filter(User.id == user_id).first()