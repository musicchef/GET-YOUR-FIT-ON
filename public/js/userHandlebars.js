document.addEventListener('DOMContentLoaded', function () {
    // Function to calculate calories burned
    function calculateCaloriesBurned(exercise) {
      const minutesElement = exercise.querySelector('.workoutMinutes');
      const caloriesPerHourElement = exercise.querySelector('.caloriesPerHour');
      const caloriesBurnedElement = exercise.querySelector('.caloriesBurned');
      
      const minutes = parseFloat(minutesElement.textContent);
      const caloriesPerHour = parseFloat(caloriesPerHourElement.textContent);
      
      const caloriesBurned = (minutes / 60) * caloriesPerHour;
      
      caloriesBurnedElement.textContent = caloriesBurned.toFixed(2);
    }
    
    // Function to calculate calories consumed
    function calculateCaloriesConsumed(nutrition) {
      const servingsElement = nutrition.querySelector('.servings');
      const calsPerServingElement = nutrition.querySelector('.calsPerServing');
      const caloriesConsumedElement = nutrition.querySelector('.caloriesConsumed');
      
      const servings = parseFloat(servingsElement.textContent);
      const calsPerServing = parseFloat(calsPerServingElement.textContent);
      
      const caloriesConsumed = servings * calsPerServing;
      
      caloriesConsumedElement.textContent = caloriesConsumed.toFixed(2);
    }
    
    // Get all exercise and nutrition list items
    const exerciseItems = document.querySelectorAll('.user-activities li');
    const nutritionItems = document.querySelectorAll('.user-nutrition li');
    
    // Calculate and update calories burned for each exercise
    exerciseItems.forEach(function (exercise) {
      calculateCaloriesBurned(exercise);
    });
    
    // Calculate and update calories consumed for each nutrition item
    nutritionItems.forEach(function (nutrition) {
      calculateCaloriesConsumed(nutrition);
    });
   });

const nutritionButton = document.getElementById('nutritionButton');
const exerciseButton = document.getElementById('exerciseButton');
const friendsButton = document.getElementById('friendsButton');

 
nutritionButton.addEventListener('click', function () {
    window.location.href = '/api/food';
});

exerciseButton.addEventListener('click', function () {
    window.location.href = '/api/workouts';
});

friendsButton.addEventListener('click', function () {
    window.location.href= '/api/friends';
});
