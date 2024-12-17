from pydantic_settings import BaseSettings


class Settings(BaseSettings):
    DATABASE_URL: str = "postgresql+psycopg2://postgres:1234@localhost:5432/TpFinalLabIV"
    
    class Config:
        env_file = ".env"

settings = Settings()
