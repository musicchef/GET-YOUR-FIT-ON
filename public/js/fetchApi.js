require('dotenv').config();

const nutritionFormHandler = async (event) => {
    event.preventDefault();
    console.log("Your button worked!")
    const userInput = document.querySelector('#foodItem').value.trim();

    const fetchNutrition = await fetch(`https://api.nal.usda.gov/fdc/v1/foods/search?api_key=${process.env.NUTRITION_API_KEY}&query=${userInput}&pageSize=10`);

    let data = fetchNutrition.json()
    console.log(data);

    return data;
};

document
.querySelector('#search-nutrition')
.addEventListener('submit', nutritionFormHandler);