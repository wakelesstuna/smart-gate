from sqlalchemy.orm import sessionmaker
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy import create_engine
from app.settings import DATABASE_URI

''' DATABASE CONNECTION '''
SQLALCHEMY_DATABASE_URL = DATABASE_URI

engine = create_engine(
    SQLALCHEMY_DATABASE_URL, connect_args={"check_same_thread": False}
)

SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base = declarative_base()


def get_session():
    try:
        session = SessionLocal()
        yield session
    finally:
        session.close()


def init_database_and_tabels():
    Base.metadata.create_all(bind=engine)
