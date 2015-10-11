from bottle import get

__author__ = 'Aishwarya Sharma'


@get("/hello")
def getHello():
    return "Hello World!"
