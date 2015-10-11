from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker

from models.idea import Base, Idea, Comments
from resources import config

__author__ = 'Aishwarya Sharma'


def init_db():
    engine = create_engine(config.db_url)
    Base.metadata.bind = engine

    dbSession = sessionmaker(bind=engine)
    session = dbSession()

    idea = Idea(title="Test", details="Testing idea")

    # Inserting an Idea
    session.add(idea)
    session.commit()
