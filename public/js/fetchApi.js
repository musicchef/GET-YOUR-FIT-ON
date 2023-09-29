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
//takes search results and puts them into a card
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
            let title = document.createElement('h4');
            let cardBody = document.createElement('div');
            let calories_description = document.createElement('h5');
            let calories = document.createElement('p');
            let addFood = document.createElement('button');

            card.classList.add('card', 'my-3', 'mx-3', 'explore_card');
            title.innerHTML = element.description;
            title.classList.add('card-header')
            card.append(title);
            cardBody.classList.add('card-body')
            calories_description.innerHTML = 'Calories per serving:';
            cardBody.append(calories_description);
            calories.innerHTML = `${element.foodNutrients[3].value}`;
            cardBody.append(calories)
            addFood.innerHTML = 'Add to My Food List'
            addFood.setAttribute('id',`uniqueID${counter}`)
            addFood.classList.add('btn')
            cardBody.append(addFood)
            card.append(cardBody)

            root.append(card)

            counter++;
        });
        //takes search results and selected item posts to food
        for(let i = 0; i < foodsArray.length; i++) {
            document
            .querySelector(`#uniqueID${i}`)
            .addEventListener('click', async (event) => {
                let food_name = event.target.parentNode.parentNode.firstElementChild.innerHTML
                let calories = event.target.previousElementSibling.innerHTML
                try {
                    const response = await fetch('api/food/explore', {
                        method: 'POST',
                        body: JSON.stringify({
                            food_name: food_name,
                            meal_name: 'Explored',
                            calorie_count_per_serving: parseInt(calories),
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

//takes exercise results and puts them in a card
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
            let title = document.createElement('h4');
            let cardBody = document.createElement('div');
            let minutes_description = document.createElement('h5')
            let minutes = document.createElement('p');
            let calories_description = document.createElement('h5')
            let calories = document.createElement('p');
            let addExercise = document.createElement('button');

            card.classList.add('card', 'my-3', 'mx-3', 'explore_card');
            title.innerHTML = element.name;
            title.classList.add('card-header')
            card.append(title);
            cardBody.classList.add('card-body')
            minutes_description.innerHTML = 'Duration of Exercise (minutes):';
            cardBody.append(minutes_description);
            minutes.innerHTML = element.duration_minutes;
            cardBody.append(minutes);
            calories_description.innerHTML = 'Calories Burned Per Hour:';
            cardBody.append(calories_description);
            calories.innerHTML = element.calories_per_hour;
            cardBody.append(calories)
            addExercise.innerHTML = 'Add to My Exercise List';
            addExercise.setAttribute('id',`uniqueID${counter}`);
            addExercise.classList.add('btn')
            cardBody.append(addExercise)
            card.append(cardBody)
            root.append(card)

            counter++
        })
        //based on what is added takes data and posts to exercise
        for (let i = 0; i < exerciseArray.length; i++){
            document
            .querySelector(`#uniqueID${i}`)
            .addEventListener('click', async (event) => {
                let title = event.target.parentNode.parentNode.firstElementChild.innerHTML
                let duration = 60;
                let calories_per_hour = event.target.previousElementSibling.innerHTML;
                try {
                    const response = await fetch('/api/workouts/create', {
                        method: 'POST',
                        body: JSON.stringify({
                            title: title,
                            minutes: duration,
                            calories_per_hour: calories_per_hour
                        }),
                        headers: {
                            'Content-Type': 'application/json',
                          },
                    })
                    if(response.ok) {
                        alert(`Added to today's exercises!`)
                    }
                } catch (err) {
                    console.error(err);
                }
            })
        }
    })
}

document
.querySelector('#search-nutrition')
.addEventListener('submit', getSearchResults);

document
.querySelector('#search-exercises')
.addEventListener('submit', getExerciseResults);