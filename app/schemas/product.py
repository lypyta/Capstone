from pydantic import BaseModel

class ProductBase(BaseModel):
    sku: str
    name: str
    unit: str
    unit_cost: float
    stock: float = 0

class ProductCreate(ProductBase):
    pass

class ProductResponse(ProductBase):
    id: int
    class Config:
        from_attributes = True
