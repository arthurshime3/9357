const express = require('express');

const app = express();
const recipies = [
    {
        "id": 716429,
        "calories": 584,
        "carbs": "84g",
        "fat": "20g",
        "protein": "19g",
        "image": "https://spoonacular.com/recipeImages/716429-312x231.jpg",
        "title": "Pasta with Garlic, Scallions, Cauliflower & Breadcrumbs"
    },
    {
        "id": 298140,
        "title": "Triple Threat Chili",
        "image": "https://spoonacular.com/recipeImages/298140-312x231.jpeg",
        "imageType": "jpeg",
        "calories": 454,
        "protein": "32g",
        "fat": "31g",
        "carbs": "12g"
    },
    {
        "id": 657095,
        "title": "Prawn Curry",
        "image": "https://spoonacular.com/recipeImages/657095-312x231.jpg",
        "imageType": "jpg",
        "calories": 458,
        "protein": "29g",
        "fat": "17g",
        "carbs": "47g"
    },
    {
        "id": 17281,
        "title": "Spicy Tuna Tartare",
        "image": "https://spoonacular.com/recipeImages/17281-312x231.jpg",
        "imageType": "jpg",
        "calories": 459,
        "protein": "29g",
        "fat": "26g",
        "carbs": "33g"
    },
    {
        "id": 90629,
        "title": "Baked Apples in White Wine",
        "image": "https://spoonacular.com/recipeImages/90629-312x231.jpg",
        "imageType": "jpg",
        "calories": 210,
        "protein": "1g",
        "fat": "3g",
        "carbs": "43g"
    },
    {
        "id": 255793,
        "title": "Grilled Lamb Chops with Peppercorns and Savory Mint Sauce",
        "image": "https://spoonacular.com/recipeImages/255793-312x231.jpg",
        "imageType": "jpg",
        "calories": 654,
        "protein": "84g",
        "fat": "27g",
        "carbs": "11g"
    },
    {
        "id": 284420,
        "title": "Chocolate Silk Pie with Marshmallow Meringue",
        "image": "https://spoonacular.com/recipeImages/284420-312x231.jpg",
        "imageType": "jpg",
        "calories": 226,
        "protein": "2g",
        "fat": "10g",
        "carbs": "33g"
    },
    {
        "id": 386395,
        "title": "Pecan Sweet Potato Bake",
        "image": "https://spoonacular.com/recipeImages/386395-312x231.jpg",
        "imageType": "jpg",
        "calories": 272,
        "protein": "3g",
        "fat": "12g",
        "carbs": "39g"
    },
    {
        "id": 568840,
        "title": "Healthy Banana Oat Snack Bars",
        "image": "https://spoonacular.com/recipeImages/568840-312x231.jpg",
        "imageType": "jpg",
        "calories": 182,
        "protein": "4g",
        "fat": "6g",
        "carbs": "28g"
    },
    {
        "id": 716723,
        "title": "Ruth Reichl's Savory Sweet Pasta for Michael",
        "image": "https://spoonacular.com/recipeImages/716723-312x231.jpg",
        "imageType": "jpg",
        "calories": 550,
        "protein": "26g",
        "fat": "11g",
        "carbs": "86g"
    }
]

app.use(express.static('dist'));
app.use(express.json());

app.get('*', function(req, res) {
    res.sendfile('./dist/index.html');
});
app.post('/api/create', (req, res) => {
    console.log(req.body);
    const shuffled = recipies.sort(() => 0.5 - Math.random());
    let selected = shuffled.slice(0, 7);
    res.send(selected);
});

app.listen(process.env.PORT || 8080, () =>
    console.log(`Listening on port ${process.env.PORT || 8080}!`),
);


