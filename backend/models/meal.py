import mongoengine as me


class Measure(me.EmbeddedDocument):
    amount = me.FloatField()
    unitLong = me.StringField()
    unitShort = me.StringField()


class Ingredient(me.EmbeddedDocument):
    id = me.IntField(primary_key=True)
    name = me.StringField(require=True)
    amount = me.FloatField()
    measures = me.ListField(me.EmbeddedDocumentField(Measure))


class Nutrient(me.EmbeddedDocument):
    title = me.StringField()
    amount = me.FloatField()
    unit = me.StringField()
    percentOfDailyNeeds = me.FloatField()


class Meal(me.Document):
    id = me.IntField(primary_key=True)
    title = me.StringField()
    image = me.URLField()
    servings = me.FloatField()
    sourceURL = me.URLField()
    readyInMinutes = me.IntField()
    pricePerServing = me.FloatField()
    cheap = me.BooleanField()
    diets = me.ListField(me.StringField())
    dairyFree = me.BooleanField()
    glutenFree = me.BooleanField()
    ketogenic = me.BooleanField()
    lowFodmap = me.BooleanField()
    sustainable = me.BooleanField()
    vegan = me.BooleanField()
    vegetarian = me.BooleanField()
    dishTypes = me.ListField(me.StringField())
    ingredients = me.ListField(me.EmbeddedDocumentField(Ingredient))
    nutrients = me.ListField(me.EmbeddedDocumentField(Nutrient))

