
Handlebars.registerHelper('calculateCalories', function(minutes, calories_per_hour) {
    return (minutes / 60) * calories_per_hour;});


const delButtonHandler = async (event) => {
    if (event.target.hasAttribute('data-id')) {
        const id = event.target.getAttribute('data-id');
      
        const response = await fetch(`/api/workouts${id}`, {
            method: 'DELETE',
        });
      
    if (response.ok) {
        document.location.replace('/dashboard');
    } else {
        alert('Failed to delete project');
    }
    }
    };
    
      document
        .querySelector('.exercise-list')
        .addEventListener('click', delButtonHandler)


Handlebars.registerHelper('totalCalories', function(exercises) {
    var total = 0;
      
    exercises.forEach(function(exercise) {
        total += Handlebars.helpers.calculateCalories(exercise.minutes, exercise.calories_perhour);
    });
      
        return total;
    });