from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    DATABASE_URL: str = "postgresql://postgres:admin123@localhost:5432/finandisruptor"

    class Config:
        env_file = ".env"

settings = Settings()
