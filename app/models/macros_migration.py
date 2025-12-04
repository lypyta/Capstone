from sqlalchemy import Column, Integer, String, Text
from app.connection import Base

class MacroMigration(Base):
    __tablename__ = "macros_migration"

    id = Column(Integer, primary_key=True)
    macro_name = Column(String, nullable=False)
    category = Column(String, nullable=False)  # cálculo, validación, admin, etc.
    description = Column(Text)
    risk_level = Column(String)  # Bajo, Medio, Alto
