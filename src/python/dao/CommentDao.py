from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker

from models.idea import Base, Idea, Comments
from resources import config

__author__ = 'Aishwarya Sharma'


def get_all_comments(idea_id):
    pass


def get_comment(id):
    pass


def delete_comment(id):
    pass


def add_comment(comment):
    pass
