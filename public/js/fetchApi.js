let root = document.getElementById('root')

async function nutritionFormHandler(input) {
    event.preventDefault();
    const data = await fetch(`https://api.nal.usda.gov/fdc/v1/foods/search?api_key=4xf4bbqjoGLfyf31OWdx7G3tGya1IgsrvJfScbhT&query=${input}`);
    return data.json();
};

async function exerciseFormHandler (input) {
    event.preventDefault();
    const url = `https://api.api-ninjas.com/v1/caloriesburned?activity=${input}`
    const options =  {
        method: 'GET',
        headers: {
            'X-Api-Key': 'JhDl2v6hLoPFwL/VC29omw==Bp5FlGGZdn0Fgso6'
        }
    }
    try {
        const response = await fetch(url, options);
        const result = await response.json();
        return result;
    } catch (err) {
        console.log(err)
    }
}

function clearDOM() {
    root.textContent = ''
}

function getSearchResults () {
    clearDOM()
    let foodsArray = []
    const userInput = document.querySelector('#foodItem').value.trim();
    nutritionFormHandler(userInput)
    .then((result) => {
        for(let i = 0; i < result.foods.length; i++) {
            foodsArray.push(result.foods[i]);
        }

        let counter = 0;
        foodsArray.forEach(element => {
            if(element.foodNutrients.length == 0){
                return
            }
            if(element.foodNutrients[3].value == 0){
                return;
            }
            let card = document.createElement('div');
            let title = document.createElement('h3');
            let calories = document.createElement('p');
            let addFood = document.createElement('button');

            card.classList.add('w-25', 'mx-3', 'my-3', 'bg-light', 'rounded');
            title.innerHTML = element.description;
            card.append(title);
            calories.innerHTML = `${element.foodNutrients[3].value}`;
            card.append(calories)
            addFood.innerHTML = 'Add to My Food List'
            addFood.setAttribute('id',`uniqueID${counter}`)
            card.append(addFood)

            root.append(card)

            counter++;
        });
        for(let i = 0; i < foodsArray.length; i++) {
            document
            .querySelector(`#uniqueID${i}`)
            .addEventListener('click', async (event) => {
                console.log(Number(event.target.previousElementSibling.innerHTML));
                const calories = event.target.previousElementSibling.innerHTML
                try {
                    const response = await fetch('api/food/explore', {
                        method: 'POST',
                        body: JSON.stringify({
                            food_name: `${String(event.target.previousElementSibling.previousElementSibling.innerHTML)}`,
                            meal_name: 'Lunch',
                            calorie_count_per_servings: parseInt(event.target.previousElementSibling.innerHTML),
                            calorie_count_servings: 1
                        }),
                        headers: {
                            'Content-Type': 'application/json',
                          },
                    })
                    if(response.ok) {
                        alert("Added to today's meals!")
                    }
                } catch (err) {
                    console.log(err)
                }
            })
        }
    })
};

function getExerciseResults () {
    clearDOM();
    let exerciseArray = [];
    let userInput = document.querySelector('#exercise').value.trim();
    exerciseFormHandler(userInput)
    .then((result) => {
        for(let i = 0; i < result.length; i++) {
            exerciseArray.push(result[i]);
        }
        console.log(exerciseArray)

        let counter = 0;
        exerciseArray.forEach(element => {
            let card = document.createElement('div');
            let title = document.createElement('h3');
            let minutes_description = document.createElement('h5')
            let minutes = document.createElement('p');
            let calories_description = document.createElement('h5')
            let calories = document.createElement('p');
            let addExercise = document.createElement('button');

            card.classList.add('w-25', 'mx-3', 'my-3', 'bg-light');
            title.innerHTML = element.name;
            card.append(title);
            minutes_description.innerHTML = 'Duration of Exercise (minutes):';
            card.append(minutes_description);
            minutes.innerHTML = element.duration_minutes;
            card.append(minutes);
            calories_description.innerHTML = 'Calories Burned Per Hour:';
            card.append(calories_description);
            calories.innerHTML = element.calories_per_hour;
            card.append(calories)
            addExercise.innerHTML = 'Add to My Exercise List';
            addExercise.setAttribute('id',`uniqueID${counter}`);
            card.append(addExercise)

            root.append(card)

            counter++
        })
    })
}

document
.querySelector('#search-nutrition')
.addEventListener('submit', getSearchResults);

document
.querySelector('#search-exercises')
.addEventListener('submit', getExerciseResults);