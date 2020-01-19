import mongoengine as me
from flask_bcrypt import generate_password_hash, check_password_hash


class User(me.Document):
    first_name = me.StringField(required=True)
    last_name = me.StringField(required=True)
    email = me.StringField(required=True, unique=True)
    password = me.StringField(required=True)

    def hash_password(self):
            self.password = generate_password_hash(self.password).decode('utf8')

    def check_password(self, password):
        return check_password_hash(self.password, password)
