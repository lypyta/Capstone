from app.connection import SessionLocal
from app.models.users import User
from app.models.roles import Role
from passlib.context import CryptContext

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

db = SessionLocal()

# crear rol admin si no existe
admin_role = db.query(Role).filter_by(name="admin").first()
if not admin_role:
    admin_role = Role(name="admin", description="Administrador del sistema")
    db.add(admin_role)
    db.commit()

# crear usuario admin si no existe
admin = db.query(User).filter_by(email="admin@erp.com").first()
if not admin:
    admin = User(
        nombre="Administrador",
        email="admin@erp.com",
        password_hash=pwd_context.hash("Admin123"),  # hash correcto
        telefono="",
        role_id=admin_role.id
    )
    db.add(admin)
    db.commit()

print("Administrador creado con éxito.")
