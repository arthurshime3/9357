from flask import Flask
from flask_mongoengine import MongoEngine

app = Flask(__name__)

app.config['MONGODB_SETTINGS'] = {
    'db': 'DBNAME',
    'host': 'URI'
}

db = MongoEngine(app)


if __name__ == '__main__':
    app.run()
