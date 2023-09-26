const nutritionFormHandler = async (event) => {
    event.preventDefault();
    console.log("Your button worked!")
    const userInput = document.querySelector('#foodItem').value.trim();

    const fetchNutrition = await fetch(`https://api.nal.usda.gov/fdc/v1/foods/search?api_key=4xf4bbqjoGLfyf31OWdx7G3tGya1IgsrvJfScbhT&query=${userInput}&pageSize=10`);

    let data = fetchNutrition.json()
    console.log(data);

    return data;
};

document
.querySelector('#search-nutrition')
.addEventListener('click', nutritionFormHandler);