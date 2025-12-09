# Import all models so create_tables can find them
from .clients import Client
from .suppliers import Supplier

from .categories import Category
from .products import Product
from .inventory import Inventory
from .supplies import Supply

from .purchase_orders import PurchaseOrder
from .purchase_order_items import PurchaseOrderItem
from .invoices import Invoice
from .invoice_items import InvoiceItem

from .quotations import Quotation
from .quotation_items import QuotationItem

from .projects import Project
from .project_costs import ProjectCost

from .financial_records import FinancialRecord
from .audit_logs import AuditLog

from .users import User
from .roles import Role
from .user_roles import UserRole
from .permissions import Permission
from .role_permissions import RolePermission

from .sessions import Session
from .access_logs import AccessLog


from .dashboards import Dashboard

