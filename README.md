# ERP Cloud – FinanDisruptor

## 📌 Descripción del Proyecto
**FinanDisruptor ERP Cloud** es un sistema ERP web desarrollado como evolución de un sistema original basado en Microsoft Excel con macros VBA.  
El proyecto tiene como objetivo modernizar, asegurar y escalar los procesos de gestión empresarial mediante una arquitectura backend profesional.

El sistema permite administrar:
- Usuarios y roles
- Clientes y proveedores
- Productos e inventario
- Cotizaciones y facturas
- Órdenes de compra
- Proyectos y costos
- Auditoría y control de accesos
Está diseñado para ser utilizado tanto en un contexto académico (proyecto de título) como comercial.
---

## 🏗️ Arquitectura del Sistema
El sistema utiliza una arquitectura **API REST** basada en capas:

app/
├── main.py # Punto de entrada FastAPI
├── connection.py # Conexión a la base de datos
├── models/ # Modelos SQLAlchemy
├── schemas/ # Validaciones Pydantic
├── routers/ # Endpoints REST
├── services/ # Lógica de negocio
└── security/ # Autenticación y JWT
---
## 🛠️ Tecnologías Utilizadas

- **Python 3.12**
- **FastAPI**
- **SQLAlchemy**
- **PostgreSQL**
- **Pydantic**
- **JWT (python-jose)**
- **bcrypt**
- **Uvicorn**
-----
## 🔐 Seguridad
- Autenticación mediante JWT
- Control de roles y permisos
- Auditoría de acciones del sistema
- Registro de accesos y sesiones
- Eliminación lógica de registros críticos
------
## 🗄️ Modelo de Datos (resumen)
Tablas principales:
- users, roles, permissions
- clients, suppliers
- products, categories
- inventory, supplies
- quotations, invoices
- purchase_orders
- projects, project_costs
- audit_logs, access_logs
---

## 🚀 Instalación y Ejecución
### 1️⃣ Clonar repositorio
```bash
git clone https://github.com/tu-usuario/finandisruptor-erp.git
cd finandisruptor-erp

2️⃣ Crear entorno virtual
python -m venv venv
source venv/bin/activate  # Linux/Mac
.\venv\Scripts\Activate.ps1  # Windows

3️⃣ Instalar dependencias
pip install -r requirements.txt

4️⃣ Configurar base de datos

Editar el archivo .env o config.py con la cadena de conexión PostgreSQL.

5️⃣ Ejecutar el sistema
uvicorn app.main:app --reload

Acceder a:
http://127.0.0.1:8000
http://127.0.0.1:8000/docs

🧪 Pruebas
Las pruebas se realizan mediante Swagger UI:
Login
CRUDs principales
Validación de errores
Control de acceso

📈 Estado del Proyecto
✔ Backend funcional
✔ Base de datos relacional
✔ Seguridad implementada
✔ CRUDs principales en desarrollo
✔ Listo para frontend web o móvil

📚 Autor
Lye Samilla Guzmán
Proyecto de Título – APT
Migración ERP Excel → ERP Cloud

📄 Licencia
Proyecto académico con proyección comercial.
