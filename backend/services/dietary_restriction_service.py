from models.dietary_restriction import DietaryRestriction
from mongoengine.queryset.visitor import Q


def get_dietary_restrictions():
    DietaryRestriction.objects.values_list('name').distinct(field="name").order_by('name')


def get_dietary_restriction(name, age, gender):
    #return DietaryRestriction.objects(Q(name=name) & Q(gender=gender) & (Q(min_age__exists=False) | Q(min_age__lte=age)) & (Q(max_age__exists=False) | Q(max_age__lte=age))).get()
    return DietaryRestriction.objects(Q(name=name) & Q(gender=gender)).get()
