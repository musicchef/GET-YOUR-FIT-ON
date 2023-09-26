const createExerciseButton = document.querySelector('.exercise-form');

const createExercise = async (event) => {
  event.preventDefault();
  const exerciseForm = document.getElementById('new-exercise-form')
  const exercise = document.querySelector('#categoriesselect1').value;
  const time= document.querySelector('#duration').value;
  let caloriesphour= ''
  if (exercise === 'Run') {
        caloriesphour= 808;
        return;
  } else if (exercise === 'Jog') {
         caloriesphour = 350;
         return;
  } else if (exercise ==='Walk') {
         caloriesphour = 200;
         return;
  } else if (exercise === 'Elliptical') {
        caloriesphour = 650;
        return;
  } else if (exercise === 'Stationary Bicycle') {
        caloriesphour = 520;
        return;
  } else if (exercise === 'Bicycle') {
        caloriesphour = 596;
        return;
  } else if (exercise === 'Circuit Training') {
        caloriesphour = 800;
        return;
  } else if (exercise === 'Jump Rope') {
        caloriesphour = 800;
        return;
  } else if (exercise === 'Rowing Machine') {
        caloriesphour = 520;
        return;
  } else if (exercise === 'Swimming') {
        caloriesphour = 492;
        return;
  } else if (exercise === 'Stationary Bicycle') {
        caloriesphour = 520;
        return;
  } else if (exercise === 'Hiking') {
        caloriesphour = 492;
        return;
  } else if (exercise === 'Aerobic Dance') {
        caloriesphour = 492;
        return;
  } else if (exercise === 'HIIT') {
        caloriesphour = 700;
        return;
  } else if (exercise === 'Weight Lifting') {
        caloriesphour = 450;
        return;
  } else if (exercise === 'Yoga') {
        caloriesphour = 250;
        return;
  } else if (exercise === 'Pilates') {
        caloriesphour = 350;
        return;
  } else if (exercise === 'Rock Climbing') {
        caloriesphour = 700;
        return;
  } else if (exercise === 'other'){
        caloriesphour=400;
        return;
  };
  if (exercise&&time ) {
    try {
    const response = await fetch('/api/workouts/create', {
        method: 'POST',
        body: JSON.stringify({ 
          title: exercise, 
          minutes: time,
          calories_per_hour: caloriesphour,
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