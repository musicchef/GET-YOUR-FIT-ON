const createMealButton = document.querySelector('.meal-form');

const createMeal = async (event) => {
  event.preventDefault();
  const meal = document.querySelector('#meal-name').value;
  const food =document.querySelector('#food-name').value
  const calPerServing= document.querySelector('#cal-per-serving').value
  const servings= document.querySelector('#servings').value;
  
  if (meal&&food&&calPerServing&&servings) {
    try {
    const response = await fetch('/api/food/create', {
        method: 'POST',
        body: JSON.stringify({ 
          food_name: food, 
          meal_name: meal,
          calorie_count_per_serving: calPerServing,
          calorie_count_servings: servings
          
        }),
        headers: {
          'Content-Type': 'application/json',
        },
      });
      console.log(response);
      if (response.ok) {
        document.location.reload();
      } else {
        alert('Failed to add meal');
      }
    } catch (err) {
    console.log(err);
  }
}}
;


createMealButton.addEventListener('submit', createMeal);