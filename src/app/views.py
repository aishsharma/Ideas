from flask import jsonify
from app import app
__author__ = 'Aishwarya Sharma'


@app.route("/test", methods=["GET"])
def test():
    return jsonify({"test": test})
