const createMealButton = document.querySelector('.meal-form');

const createMeal = async (event) => {
  event.preventDefault();
  const mealForm = document.getElementById('new-meal-form')
  const meal = document.querySelector('#categoriesselect1').value;
  const time= document.querySelector('#duration').value;
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
  if (exercise&&time ) {
    try {
    const response = await fetch('/api/workouts', {
        method: 'POST',
        body: JSON.stringify({ 
          title: exercise, 
          minutes: time,
          calories_per_hour: caloriespserving,
          user_id: exerciseForm.dataset.id
        }),
        headers: {
          'Content-Type': 'application/json',
        },
      });
      console.log(response);
      if (response.ok) {
        document.location.reload();
      } else {
        alert('Failed to add exercise');
      }
    } catch (err) {
    console.log(err);
  }
}}
;


createExerciseButton.addEventListener('submit', createExercise);