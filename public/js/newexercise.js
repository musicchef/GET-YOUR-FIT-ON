const createExerciseButton = document.querySelector('#new-exercise-form');

const createExercise = async (event) => {
  event.preventDefault();
  const exercise = document.querySelector('#categoriesselect1').value;
  const time= document.querySelector('#duration').value;
  let caloriesphour= ''
  if (exercise === 'Run') {
        caloriesphour= 808;
  } else if (exercise === 'Jog') {
         caloriesphour = 350;
  } else if (exercise ==='Walk') {
         caloriesphour = 200;
  } else if (exercise === 'Elliptical') {
        caloriesphour = 650;
  } else if (exercise === 'Stationary Bicycle') {
        caloriesphour = 520;
  } else if (exercise === 'Bicycle') {
        caloriesphour = 596;
  } else if (exercise === 'Circuit Training') {
        caloriesphour = 800;
  } else if (exercise === 'Jump Rope') {
        caloriesphour = 800;
  } else if (exercise === 'Rowing Machine') {
        caloriesphour = 520;
  } else if (exercise === 'Swimming') {
        caloriesphour = 492;
  } else if (exercise === 'Stationary Bicycle') {
        caloriesphour = 520;
  } else if (exercise === 'Hiking') {
        caloriesphour = 492;
  } else if (exercise === 'Aerobic Dance') {
        caloriesphour = 492;
  } else if (exercise === 'HIIT') {
        caloriesphour = 700;
  } else if (exercise === 'Weight Lifting') {
        caloriesphour = 450;
  } else if (exercise === 'Yoga') {
        caloriesphour = 250;
  } else if (exercise === 'Pilates') {
        caloriesphour = 350;
  } else if (exercise === 'Rock Climbing') {
        caloriesphour = 700;
  } else if (exercise === 'other'){
        caloriesphour=400;
  };
  if (exercise&&time ) {
    try {
    const response = await fetch('/api/workouts/create', {
        method: 'POST',
        body: JSON.stringify({ 
          title: exercise, 
          minutes: parseInt(time),
          calories_per_hour: caloriesphour,
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