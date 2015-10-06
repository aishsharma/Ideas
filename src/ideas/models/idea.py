from sqlalchemy import Column, Integer, String, ForeignKey
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import relationship
from sqlalchemy import create_engine

from resources import config

__author__ = 'Aishwarya Sharma'

Base = declarative_base()


# Ideas that people will post online
class Idea(Base):
    __tablename__ = "ideas"
    id = Column(Integer, primary_key=True)
    title = Column(String, nullable=False)
    details = Column(String, nullable=True)


# Comments people can leave on other's ideas
class Comments(Base):
    __tablename__ = "comments"
    id = Column(Integer, primary_key=True)
    idea_id = Column(Integer, ForeignKey("ideas.id"))
    idea = relationship(Idea)
    display_name = Column(String, nullable=False)
    content = Column(String, nullable=False)

# Creating database engine for our table metadata
print("URL: " + config.db_url)
engine = create_engine(config.db_url, echo=True)

# Creating all tables if they don't exist
Base.metadata.create_all(engine)
