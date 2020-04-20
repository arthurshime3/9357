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

app.config['JWT_TOKEN_LOCATION'] = ['cookies']
app.config['JWT_COOKIE_CSRF_PROTECT'] = False # shouldn't use this in production
app.config['JWT_SECRET_KEY'] = 'ECB13532453C19A1783AF9A4033CB6839323258F953D56EE6EAB6697F7332543'


db = MongoEngine(app)
bcrypt = Bcrypt(app)
jwt = JWTManager(app)

initialize_routes(api)

if __name__ == '__main__':
    app.run()
