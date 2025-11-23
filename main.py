from fastapi import FastAPI

app = FastAPI()

@app.get("/")
def root():
    return {"message": "ERP Cloud funcionando correctamente"}
