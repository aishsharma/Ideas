# For SQL Alchemy ORM
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from models.IdeaModels import Base, Idea
from resources import config

# For Exceptions
import sys

__author__ = 'Aishwarya Sharma'


def get_all_ideas():
    engine = create_engine(config.db_url)
    Base.metadata.bind = engine

    db_session = sessionmaker(bind=engine)
    session = db_session()

    try:
        session.begin()
        results = session.query(Idea).order_by(Idea.timestamp.desc()).all()
        session.commit()
    except:
        session.rollback()
        raise Exception("Database Error: " + sys.exc_info()[1])
    finally:
        session.close()

    return results


def get_idea(id):
    engine = create_engine(config.db_url)
    Base.metadata.bind = engine

    db_session = sessionmaker(bind=engine)
    session = db_session()

    try:
        session.begin()
        results = session.query(Idea).filter(Idea.id == id).one()
        session.commit()
    except:
        session.rollback()
        raise Exception("Database Error: " + sys.exc_info()[1])
    finally:
        session.close()

    return results


def search(text):
    engine = create_engine(config.db_url)
    Base.metadata.bind = engine

    db_session = sessionmaker(bind=engine)
    session = db_session()

    try:
        session.begin()
        results = session.query(Idea).filter(Idea.title.like("%" + text + "%")).order_by(Idea.timestamp.desc()).all()
        session.commit()
    except:
        session.rollback()
        raise Exception("Database Error: " + sys.exc_info()[1])
    finally:
        session.close()

    return results


def delete_idea(idea_id):
    engine = create_engine(config.db_url)
    Base.metadata.bind = engine

    db_session = sessionmaker(bind=engine)
    session = db_session()

    try:
        session.begin()
        result = session.query(Idea).filter(Idea.id == idea_id).one()
        session.delete(result)
        session.commit()
    except:
        session.rollback()
        raise Exception("Database Error: " + sys.exc_info()[1])
    finally:
        session.close()

    return True


def add_or_update_idea(idea):
    engine = create_engine(config.db_url)
    Base.metadata.bind = engine

    db_session = sessionmaker(bind=engine)
    session = db_session()

    try:
        session.begin()
        session.add(idea)
        session.commit()
    except:
        session.rollback()
        raise Exception("Database Error: " + sys.exc_info()[1])
    finally:
        session.close()

    return True
