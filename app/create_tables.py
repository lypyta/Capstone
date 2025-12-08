from app.connection import engine, Base
# Import models package to register classes with Base.metadata
import app.models

print("🔄 Creando tablas en PostgreSQL (si no existen)...")
Base.metadata.create_all(bind=engine)
print("✅ Tablas creadas / verificadas.")
