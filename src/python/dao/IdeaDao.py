# For SQL Alchemy ORM
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from models.IdeaModels import Base, Idea
from resources import config

__author__ = 'Aishwarya Sharma'

__all__ = ["get_all_ideas", "get_idea", "add_or_update_idea", "search", "delete_idea"]


def get_all_ideas(session):
    return [element.to_dict() for element in session.query(Idea).order_by(Idea.timestamp.desc()).all()]


def get_idea(idea_id, session):
    return session.query(Idea).filter(Idea.id == idea_id).one().to_dict()


def search(text, session):
    return session.query(Idea).filter(Idea.title.like("%" + text + "%")).order_by(Idea.timestamp.desc()).all()


def delete_idea(idea_id, session):
    result = session.query(Idea).filter(Idea.id == idea_id).one()
    session.delete(result)
    return True


def add_or_update_idea(idea, session):
    session.add(idea)
    return True