from pydantic import BaseModel

class LoginRequest(BaseModel):
    email: str
    password: str


class TokenResponse(BaseModel):
    access_token: str
    token_type: str = "bearer"


class UserTokenData(BaseModel):
    id: int
    email: str
    role_id: int
