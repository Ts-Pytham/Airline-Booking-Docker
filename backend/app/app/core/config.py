from pydantic import BaseSettings
from functools import lru_cache
import os
from os.path import dirname
from dotenv import load_dotenv

class Settings(BaseSettings):

    load_dotenv(f"{dirname(__file__)}/settings.env") # change this to your .env file path 

    DATABASE_USERNAME : str = os.getenv('DATABASE_USERNAME')
    DATABASE_PASSWORD : str = os.getenv('DATABASE_PASSWORD')
    DATABASE_HOST : str = os.getenv('DATABASE_HOST')
    DATABASE_PORT : str = int(os.getenv('DATABASE_PORT'))
    DATABASE_NAME : str = os.getenv('DATABASE_NAME')

    DATABASE_URI : str = f"postgresql://{DATABASE_USERNAME}:{DATABASE_PASSWORD}@{DATABASE_HOST}:{DATABASE_PORT}/{DATABASE_NAME}"
    ACCESS_TOKEN_EXPIRE_MINUTES : int = 60 * 24 * 8  # 60 minutes * 24 hours * 8 days = 8 days
    SECRET_KEY : str = os.getenv('SECRET_KEY')
    ALGORITHM : str = "HS512"
    
    class Config:
        case_sensitive : bool = True

@lru_cache
def get_Settings() -> Settings:
    return Settings()


settings = get_Settings()

