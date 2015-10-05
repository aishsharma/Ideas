import os
__author__ = 'Aishwarya Sharma'

basedir = os.path.abspath(os.path.join( os.path.dirname(__file__), ".."))

db_url = 'sqlite:///' + os.path.join(basedir, "store", "ideas.db")
