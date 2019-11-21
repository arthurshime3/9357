const express = require('express');

const app = express();

const breakfast = require('./breakfast');
const lunch = require('./lunch');
const dinner = require('./dinner');

const math = require('mathjs');

const getSelections = meals => {
    let out = [];
    for (let i = 0; i < 7; i++) {
        out.push(meals[Math.floor(Math.random() * meals.length)]);
    }
    return out;
};

const applyFilters = (prefs, meals) => {
    if (prefs.diet.includes('Vegetarian')) {
        meals = meals.filter(meal => meal.vegetarian);
    }
    return meals;
};

app.use(express.static('dist'));
app.use(express.json());

app.get('*', function(req, res) {
    res.sendfile('./dist/index.html');
});
app.post('/api/create', (req, res) => {
    console.log(req.body);
    const prefs = req.body;
    let meals = [];
    meals.push(
        getSelections(applyFilters(prefs, breakfast)),
        getSelections(applyFilters(prefs, lunch)),
        getSelections(applyFilters(prefs, dinner)),
    );
    meals = math.transpose(meals);
    res.send(meals);
});

app.listen(process.env.PORT || 8080, () =>
    console.log(`Listening on port ${process.env.PORT || 8080}!`),
);
