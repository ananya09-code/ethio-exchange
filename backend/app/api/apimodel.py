from sqlalchemy import Column, Integer, String, Float, DateTime, ForeignKey, func
from .apidatabase import Base


class Bank(Base):
    __tablename__ = "banks"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, unique=True, nullable=False)


class Rate(Base):
    __tablename__ = "rates"

    id = Column(Integer, primary_key=True, index=True)

    bank_id = Column(Integer, ForeignKey("banks.id"))
    bank_name = Column(String, nullable=False)

    currency_code = Column(String, nullable=False)
    buy = Column(Float)
    sell = Column(Float)

    created_at = Column(DateTime, server_default=func.now())