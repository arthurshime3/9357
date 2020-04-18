import React from 'react';
import { Text, View, Image, Page } from '@react-pdf/renderer';

import styles from './styles';
import '../css/MealDetailView.css';
import { LI, TR } from './custom';

export const RecipeView = (props) => {
    const recipe = props.meal.recipe;
    const readyIn = props.meal.readyInMinutes;
    if (recipe == null || recipe.length == 0) {
        return <Text style={{ fontSize: '10' }}>No recipe found!</Text>;
    }
    return (
        <>
            {readyIn == null || (
                <Text style={{ fontSize: '12' }}>
                    Ready in {readyIn} minutes
                </Text>
            )}
            {recipe.map((step, i) => (
                <LI style={{ fontSize: '12' }} key={`recipe${i}`}>
                    {i + 1}. {step}
                </LI>
            ))}
        </>
    );
};

export const IngredientsView = (props) => {
    const ingredients = props.meal.ingredients;
    if (ingredients == null || ingredients.length == 0) {
        return <Text>No ingredients found!</Text>;
    }
    return (
        <View>
            {ingredients.map((ing, i) => (
                <LI key={`ingredients${i}`} style={{ fontSize: '12' }}>
                    {parseFloat(ing.amount.toFixed(2))}{' '}
                    {ing.measures[0].unitLong} {ing.name}
                </LI>
            ))}
        </View>
    );
};

export const NutritionFactsView = (props) => {
    const nutrients = props.meal.nutrients;
    if (nutrients == null || Object.keys(nutrients).length == 0) {
        return <Text>Nutrition facts missing!</Text>;
    }
    return (
        <View className="NutritionLabel">
            {props.meal.servings == null || (
                <Text id="servings" style={{ fontSize: '12' }}>
                    {props.meal.servings} serving(s)
                </Text>
            )}
            <View style={{ display: 'table' }}>
                <View
                    style={{
                        display: 'flex',
                        flexDirection: 'row',
                        width: '50%',
                        margin: 'auto',
                        alignItems: 'flex-end',
                    }}>
                    <View style={{ width: '40%' }}>
                        <Text style={styles.th}>Nutrient</Text>
                    </View>
                    <View style={{ width: '30%' }}>
                        <Text style={styles.th}>Amount</Text>
                    </View>
                    <View style={{ width: '20%', textAlign: 'right' }}>
                        <Text style={styles.th}>% Daily Value*</Text>
                    </View>
                </View>
                {Object.keys(nutrients).map((name) => (
                    <View
                        style={{
                            display: 'flex',
                            flexDirection: 'row',
                            width: '50%',
                            margin: 'auto',
                        }}
                        key={name}>
                        <View style={{ width: '40%' }}>
                            <Text style={styles.td}>{name}</Text>
                        </View>
                        <View style={{ width: '30%' }}>
                            <Text style={styles.td}>
                                {nutrients[name].amount}
                                {nutrients[name].unit}
                            </Text>
                        </View>
                        <View style={{ width: '20%', textAlign: 'right' }}>
                            <Text style={styles.td}>
                                {nutrients[name].percentOfDailyNeeds}%
                            </Text>
                        </View>
                    </View>
                ))}
            </View>
            <Text style={styles.disclaimer}>
                *The % Daily Value (DV) tells you how much a nutrient in a
                serving of food contributes to a daily diet. 2000 calories a day
                is used for general nutrition advice.
            </Text>
        </View>
    );
};

export const SmallNutritionView = (props) => {
    const nutrients = props.meal.nutrients;
    if (nutrients == null || Object.keys(nutrients).length == 0) {
        return <Text>Nutrition facts missing!</Text>;
    }

    const shortlist = [
        'Calories',
        'Fat',
        'Saturated Fat',
        'Carbohydrates',
        'Net Carbohydrates',
        'Sugar',
        'Cholesterol',
        'Sodium',
        'Protein',
        'Fiber',
    ];

    return (
        <View className="NutritionLabel">
            {props.meal.servings == null || (
                <Text id="servings" style={{ fontSize: '12' }}>
                    {props.meal.servings} serving(s)
                </Text>
            )}
            <View style={{ display: 'table' }}>
                <View
                    style={{
                        display: 'flex',
                        flexDirection: 'row',
                        width: '50%',
                        // margin: 'auto',
                        alignItems: 'flex-end',
                    }}>
                    <View style={{ width: '40%' }}>
                        <Text style={styles.th}>Nutrient</Text>
                    </View>
                    <View style={{ width: '30%' }}>
                        <Text style={styles.th}>Amount</Text>
                    </View>
                    <View style={{ width: '20%', textAlign: 'right' }}>
                        <Text style={styles.th}>% Daily Value*</Text>
                    </View>
                </View>
                {Object.keys(nutrients)
                    .filter((n) => shortlist.includes(n))
                    .map((name) => (
                        <View
                            style={{
                                display: 'flex',
                                flexDirection: 'row',
                                width: '50%',
                                // margin: 'auto',
                            }}
                            key={name}>
                            <View style={{ width: '40%' }}>
                                <Text style={styles.td}>{name}</Text>
                            </View>
                            <View style={{ width: '30%' }}>
                                <Text style={styles.td}>
                                    {nutrients[name].amount}
                                    {nutrients[name].unit}
                                </Text>
                            </View>
                            <View style={{ width: '20%', textAlign: 'right' }}>
                                <Text style={styles.td}>
                                    {nutrients[name].percentOfDailyNeeds}%
                                </Text>
                            </View>
                        </View>
                    ))}
                <View style={{ width: '50%' }}>
                    <Text style={styles.disclaimer}>
                        *The % Daily Value (DV) tells you how much a nutrient in
                        a serving of food contributes to a daily diet. 2000
                        calories a day is used for general nutrition advice.
                    </Text>
                </View>
            </View>
        </View>
    );
};

const MealView = ({ meal }) => {
    return (
        <View break>
            <Text style={styles.h2}>{meal.title}</Text>
            <View
                style={{
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                }}>
                <View style={{ width: '50%' }}>
                    <Image
                        src={meal.image}
                        id="meal_img"
                        style={styles.mealimg}
                    />
                </View>
                <View style={{ width: '50%' }}>
                    <Text style={styles.h3}>Ingredients</Text>
                    <IngredientsView meal={meal} />
                </View>
            </View>
            <Text style={styles.h3}>Recipe</Text>
            <RecipeView meal={meal} />
            <Text style={styles.h3}>Nutrition Facts</Text>
            <SmallNutritionView meal={meal} />
            {meal.sourceURL && (
                <Text style={{ fontSize: '8' }}>{meal.sourceURL}</Text>
            )}
        </View>
    );
};

export default MealView;
