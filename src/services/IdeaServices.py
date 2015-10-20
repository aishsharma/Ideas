from bottle import get, post, request, route, static_file
from controllers import IdeaController


__author__ = 'Aishwarya Sharma'


@get("/api/getAllIdeas")
def get_all_ideas():
    return IdeaController.get_ideas()


@get("/api/getIdea/<idea_id>")
def get_idea(idea_id):
    return IdeaController.get_ideas(idea_id)


@post("/api/newIdea")
def new_idea():
    title = request.forms.get("title")
    details = request.forms.get("details")
    return IdeaController.new_idea(title, details)


@get("/api/search/<text>")
def search(text):
    return IdeaController.search(text)


# Route to serve static files
@route('/')
def index():
    return static_file("index.html", root="Web")


@route('/:filename#.*#')
def static(filename):
    return static_file(filename, root="Web")


@error
def error():
    return static_file("404.html", root="Web")