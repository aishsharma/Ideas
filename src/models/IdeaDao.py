# For SQL Alchemy ORM
from sqlalchemy import or_
from models.IdeaModels import Base, Idea

__author__ = 'Aishwarya Sharma'


def get_all_ideas(session):
    return [element.to_dict() for element in session.query(Idea).order_by(Idea.timestamp.desc()).all()]


def get_idea(idea_id, session):
    return session.query(Idea).filter(Idea.id == idea_id).one().to_dict()


def search(text, session):
    if text is None or text is "":
        return get_idea(session)
    else:
        return [element.to_dict() for element in session.query(Idea).filter(or_(Idea.title.like("%" + text + "%")
                                                                                , Idea.details.like(
                "%" + text + "%"))).order_by(Idea.timestamp.desc()).all()]


def delete_idea(idea_id, session):
    result = session.query(Idea).filter(Idea.id == idea_id).one()
    session.delete(result)
    return True


def add_or_update_idea(idea, session):
    session.add(idea)
    return True
