from app.connection import engine, Base

# Importar todos los modelos
import app.models.users
import app.models.clients
import app.models.projects
import app.models.financial_records
import app.models.audit_logs
import app.models.macros_migration
import app.models.product  # LO INCLUYO TAMBIÉN

print("🔄 Creando tablas en PostgreSQL...")

Base.metadata.create_all(bind=engine)

print("✅ Tablas creadas correctamente.")
