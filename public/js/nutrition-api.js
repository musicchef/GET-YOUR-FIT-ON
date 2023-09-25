require('dotenv').config();

food = 'chicken'

async function getNutrition(foodItem) {
    const fetchNutrition = await fetch(`https://api.nal.usda.gov/fdc/v1/foods/search?api_key=${process.env.NUTRITION_API_KEY}&query=${foodItem}&pageSize=1`);
    return fetchNutrition.json();
};

getNutrition(food)
.then((result) => {
    console.log(result)
});