# SQL Alchemy ORM
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker

# My Imports
from models import IdeaDao
from models.IdeaModels import Idea, Base
from resources import config
import traceback

__author__ = 'Aishwarya Sharma'


def get_ideas(idea_id=None):
    results = {"status": 200, "data": "", "error": ""}

    # Creating a session for database access.
    engine = create_engine(config.db_url)
    Base.metadata.bind = engine

    db_session = sessionmaker(bind=engine)
    session = db_session()

    try:
        if idea_id is None:
            results["data"] = IdeaDao.get_all_ideas(session)
        else:
            results["data"] = IdeaDao.get_idea(idea_id, session)

        session.commit()
    except:
        session.rollback()
        results["status"] = 500
        results["error"] = "There was a database error.\n" + traceback.format_exc()
    finally:
        session.close()
    return results


def new_idea(title, details):
    results = {"status": 200, "data": "", "error": ""}

    # Creating a session for database access.
    engine = create_engine(config.db_url)
    Base.metadata.bind = engine

    db_session = sessionmaker(bind=engine)
    session = db_session()

    if not validate(title):
        results["status"] = 500
        results["error"] = "Title cannot be empty."
    elif not validate(details):
        results["status"] = 500
        results["error"] = "Details cannot be empty."
    else:
        try:
            idea = Idea(title, details)
            results["data"] = IdeaDao.add_or_update_idea(idea, session)
            session.commit()
        except:
            session.rollback()
            results["status"] = 500
            results["error"] = "There was a database error." + traceback.format_exc()
        finally:
            session.close()

    return results


# Validating form inputs for new ideas
def validate(field):
    if field is None or field == "":
        return False
    else:
        return True


def search(text):
    results = {"status": 200, "data": "", "error": ""}

    # Creating a session for database access.
    engine = create_engine(config.db_url)
    Base.metadata.bind = engine

    db_session = sessionmaker(bind=engine)
    session = db_session()

    try:
        results["data"] = IdeaDao.search(text, session)
        session.commit()
    except:
        session.rollback()
        results["status"] = 500
        results["error"] = "There was a database error.\n" + traceback.format_exc()
    finally:
        session.close()
    return results
