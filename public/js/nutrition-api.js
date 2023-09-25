require('dotenv').config;

async function getNutrition(foodItem) {
    const fetchNutrition = await fetch(`https://api.nal.usda.gov/fdc/v1/food/search/?api_key=${process.env.NUTRITION_API_KEY}&query=${foodItem}`);
    return fetchNutrition.json();
};

getNutrition(food)
.then((result) => {
    console.log(result)
});