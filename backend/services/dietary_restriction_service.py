from models.dietary_restriction import DietaryRestriction
from mongoengine.queryset.visitor import Q


def get_dietary_restrictions():
    return DietaryRestriction.objects.values_list('name').order_by('name').distinct(field='name')


def get_dietary_restriction(name, age, gender):
    diet = DietaryRestriction.objects(Q(name=name) & Q(gender=gender) & (Q(min_age__exists=False) | Q(min_age__lte=age)) & (Q(max_age__exists=False) | Q(max_age__gte=age))).get()
    return diet
    # return DietaryRestriction.objects(Q(name=name) & Q(gender=gender)).get()
