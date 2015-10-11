from sqlalchemy import Column, Integer, String, ForeignKey, DATETIME
from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import backref, relationship

from resources import config

__author__ = 'Aishwarya Sharma'

Base = declarative_base()


class AllBase:
    id = Column(Integer, primary_key=True)
    timestamp = Column(DATETIME, nullable=False)


# Ideas that people will post online
class Idea(Base, AllBase):
    __tablename__ = "ideas"
    title = Column(String, index=True, nullable=False)
    details = Column(String, index=True, nullable=True)
    comments = relationship("Comment", backref="comments", cascade="all, delete, delete-orphan")

    # def to_dict(self):
    #     return {"id": self.id, "title": self.title, "details": self.details, "timestamp": self.timestamp}


# Comments people can leave on other's ideas
class Comment(Base, AllBase):
    __tablename__ = "comments"
    idea_id = Column(Integer, ForeignKey("ideas.id"))
    reply_to_id = Column(Integer)
    display_name = Column(String, nullable=False)
    content = Column(String, nullable=False)

    # def to_dict(self):
    #     return {"id": self.id, "idea_id": self.idea_id, "reply_to_id": self.reply_to_id,
    #             "display_name": self.display_name, "timestamp": self.timestamp}

# Creating database engine for our table metadata
engine = create_engine(config.db_url, echo=config.db_echo)

# Creating all tables if they don't exist
Base.metadata.create_all(engine)
