from flask import Flask
from flask_restful import Api
from flask_mongoengine import MongoEngine
from flask_bcrypt import Bcrypt


app = Flask(__name__)
api = Api(app)

app.config['MONGODB_SETTINGS'] = {
    'db': 'jdtest',
    'host': 'mongodb://jd:password1@ds225205.mlab.com:25205/jdtest?retryWrites=false'
}

db = MongoEngine(app)
bcrypt = Bcrypt(app)


if __name__ == '__main__':
    app.run()
