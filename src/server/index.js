const express = require('express');

const app = express();

const breakfast = require('./breakfast');
const lunch = require('./lunch');
const dinner = require('./dinner');

const math = require('mathjs');

const getSelections = meals => {
    const shuffled = meals.sort(() => 0.5 - Math.random());
    return shuffled.slice(0, 7);
};

app.use(express.static('dist'));
app.use(express.json());

app.get('*', function(req, res) {
    res.sendfile('./dist/index.html');
});
app.post('/api/create', (req, res) => {
    console.log(req.body);
    let meals = [];
    meals.push(
        getSelections(breakfast),
        getSelections(lunch),
        getSelections(dinner),
    );
    meals = math.transpose(meals);
    res.send(meals);
});

app.listen(process.env.PORT || 8080, () =>
    console.log(`Listening on port ${process.env.PORT || 8080}!`),
);
