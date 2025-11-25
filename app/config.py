from pydantic import BaseSettings

class Settings(BaseSettings):
    DATABASE_URL: str = "postgresql://admin:admin123@localhost:5432/erp"

    class Config:
        env_file = ".env"

settings = Settings()
