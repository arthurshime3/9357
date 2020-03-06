import mongoengine as me

UNITS = ['g/kg', 'g', 'mg', 'IU', 'μg']
GENDERS = ['Male', 'Female']


class Restriction(me.EmbeddedDocument):
    name = me.StringField(required=True)
    value = me.FloatField(min_value=0, required=True)
    unit = me.StringField(choices=UNITS, required=True)
    is_min = me.BooleanField(default=False)
    is_multiplier = me.BooleanField(default=False)


class DietaryRestriction(me.Document):
    name = me.StringField(required=True)
    gender = me.StringField(choices=GENDERS, required=True)
    min_age = me.IntField(min_value=0)
    max_age = me.IntField(min_value=0)
    restrictions = me.ListField(me.EmbeddedDocumentField(Restriction))
