from bottle import get, post, static_file
from controllers import IdeaController

import json

__author__ = 'Aishwarya Sharma'


@get("/api/getAllIdeas")
def get_all_ideas():
    return IdeaController.get_ideas()
