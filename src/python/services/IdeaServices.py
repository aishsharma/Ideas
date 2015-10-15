from bottle import get, post, request
from controllers import IdeaController


__author__ = 'Aishwarya Sharma'


@get("/api/getAllIdeas")
def get_all_ideas():
    return IdeaController.get_ideas()


@get("/api/getIdea/<id>")
def get_idea():
    return IdeaController.get_ideas(id)


@post("/api/newIdea")
def new_idea():
    title = request.forms.get("title")
    details = request.forms.get("details")
    return IdeaController.new_idea(title, details)
