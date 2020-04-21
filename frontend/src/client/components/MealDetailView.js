import React from 'react';
import { Link } from '@reach/router';
import { NutritionLabel } from 'react-fda-nutrition-facts';

import '../css/MealDetailView.css';

export const RecipeView = (props) => {
    const recipe = props.meal.recipe;
    const readyIn = props.meal.readyInMinutes;
    console.log(`readyIn: ${readyIn}`);
    if (recipe == null || recipe.length == 0) {
        return <p>No recipe found!</p>;
    }
    return (
        <>
            {readyIn == null || <p>Ready in {readyIn} minutes</p>}
            <ol>
                {recipe.map((step, i) => (
                    <li key={`recipe${i}`}>{step}</li>
                ))}
            </ol>
        </>
    );
};

export const IngredientsView = (props) => {
    const ingredients = props.meal.ingredients;
    if (ingredients == null || ingredients.length == 0) {
        return <p>No ingredients found!</p>;
    }
    return (
        <ul>
            {ingredients.map((ing, i) => (
                <li key={`ingredients${i}`}>
                    {parseFloat(ing.amount.toFixed(2))}{' '}
                    {ing.measures[0].unitLong} {ing.name}
                </li>
            ))}
        </ul>
    );
};

export const NutritionFactsView = (props) => {
    const nutrients = props.meal.nutrients;
    if (nutrients == null || Object.keys(nutrients).length == 0) {
        return <p>Nutrition facts missing!</p>;
    }
    return (
        <div className="NutritionLabel">
            {props.meal.servings == null || (
                <p id="servings">{props.meal.servings} serving(s)</p>
            )}
            <table>
                <thead>
                    <tr>
                        <th>Nutrient</th>
                        <th>Amount</th>
                        <th>% Daily Value*</th>
                    </tr>
                </thead>
                <tbody>
                    {Object.keys(nutrients).map((name) => (
                        <tr key={name}>
                            <td>{name}</td>
                            <td>
                                {nutrients[name].amount}
                                {nutrients[name].unit}
                            </td>
                            <td className="DVlabel">
                                {nutrients[name].percentOfDailyNeeds}%
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <p id="disclaimer">
                *The % Daily Value (DV) tells you how much a nutrient in a
                serving of food contributes to a daily diet. 2000 calories a day
                is used for general nutrition advice.
            </p>
        </div>
    );
};

const MealView = (props) => {
    const meal = props.mealData;

    return (
        <div className="MealDetailView">
            <a onClick={() => props.back()} className="closeButton">
                <img src="../../public/close.png" />
            </a>

            <h2>{meal.title}</h2>
            <img src={meal.image} id="meal_img" />

            <h3>Ingredients</h3>
            <IngredientsView meal={meal} />
            <h3>Recipe</h3>
            <RecipeView meal={meal} />
            <h3>Nutrition Facts</h3>
            <NutritionFactsView meal={meal} />

            {meal.sourceURL && (
                <p id="sourceURL">
                    <a href={meal.sourceURL}>Source</a>
                </p>
            )}

            {/* {JSON.stringify(Object.keys(meal))} */}
        </div>
    );
};

export default MealView;
