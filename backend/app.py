from flask import Flask
from flask_restful import Api
from flask_mongoengine import MongoEngine
from flask_bcrypt import Bcrypt
from resources.routes import initialize_routes
from resources.errors import errors
from flask_jwt_extended import JWTManager


app = Flask(__name__)
api = Api(app, errors=errors)

app.config['MONGODB_SETTINGS'] = {
    'db': 'jdtest',
    'host': 'mongodb://jd:password1@ds225205.mlab.com:25205/jdtest?retryWrites=false'
}

app.config['JWT_SECRET_KEY'] = 'super-secret'  # Change this!

db = MongoEngine(app)
bcrypt = Bcrypt(app)
jwt = JWTManager(app)

initialize_routes(api)

if __name__ == '__main__':
    app.run()
