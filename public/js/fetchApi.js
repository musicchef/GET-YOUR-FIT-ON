require('dotenv').config();

const userInput = document.getElementById('foodItem').value.trim();

async function searchNutritionHandler(input) {
    
    console.log("Your button worked!")

    const fetchNutrition = await fetch(`https://api.nal.usda.gov/fdc/v1/foods/search?api_key=${process.env.NUTRITION_API_KEY}&query=${input}&pageSize=10`);

    let data = await fetchNutrition.json()
    console.log(data);

    return data;
};

document
.getElementById('nutritionSearch')
.addEventListener('click', searchNutritionHandler(userInput));