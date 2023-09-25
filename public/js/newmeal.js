const createMealButton = document.querySelector('.meal-form');

const createMeal = async (event) => {
  event.preventDefault();
  const mealForm = document.getElementById('new-meal-form')
  const meal = document.querySelector('#categoriesselect1').value;
  const servingn= document.querySelector('#duration').value;
  const caloriespserving= ''
  if (exercise === 'Chicken breast') {
        caloriespserving= 83;
        return;
  } else if (meal === 'Lasagna') {
         caloriespserving = 401;
         return;
  } else if (meal ==='Cheese Pizza') {
         caloriespserving = 280;
         return;
  } else if (meal === 'Banana') {
        caloriespserving = 121;
        return;
  } else if (meal === '1% Milk') {
        caloriespserving = 120;
        return;
  } else if (meal === 'Quesadilla') {
        caloriespserving = 673;
        return;
  } else if (meal === 'Pasta with Meatballs') {
        caloriespserving = 379;
        return;
  } else if (meal === 'Hamburger') {
        caloriespserving = 540;
        return;
  } else if (meal === 'Sushi') {
        caloriespserving = 349;
        return;
  } else if (meal === 'Taco') {
        caloriespserving = 210;
        return;
  } else if (meal === 'Steamed Broccoli') {
        caloriespserving = 541;
        return;
  };
  if (meal&&servingn) {
    try {
    const response = await fetch('/api/food', {
        method: 'POST',
        body: JSON.stringify({ 
          title: meal, 
          number_of_servings: servingn,
          calorie_count_per_serving: caloriespserving,
          user_id: mealForm.dataset.id
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