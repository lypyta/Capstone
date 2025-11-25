from fastapi import FastAPI
from app.routers.product import router as product_router
from app.database.connection import Base, engine

# Crea las tablas automáticamente (sencillo para empezar)
Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="ERP Cloud - Base",
    version="1.0.0"
)

app.include_router(product_router)

@app.get("/")
def root():
    return {"message": "ERP Cloud iniciado correctamente"}
