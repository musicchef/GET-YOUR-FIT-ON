const { Nutrition } = require("../../models");

Handlebars.registerHelper('calculateCalories', function(calorie_count_per_serving, calories_per_hour) {
    return (calorie_count_per_serving / 60) * calories_count_servings;});


const delButtonHandler = async (event) => {
    if (event.target.hasAttribute('data-id')) {
        const id = event.target.getAttribute('data-id');
      
        const response = await fetch(`/api/food${id}`, {
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
        .querySelector('.meal-list')
        .addEventListener('click', delButtonHandler)


Handlebars.registerHelper('totalCalories', function(nutrition) {
    var total = 0;
      
    nutrition.forEach(function(nutrition) {
        total += Handlebars.helpers.calculateCalories(nutrition.calorie_count_per_serving, nutrition.calorie_count_servings);
    });
      
        return total;
    });