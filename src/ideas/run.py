from bottle import run
from dao import dao
from services import testService

__author__ = 'Aishwarya Sharma'

dao.init_db()

run(host="localhost", port=8080, debug=True)
