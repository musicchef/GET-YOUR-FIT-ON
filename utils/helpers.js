module.exports = {
  format_date: (date) => {
    // Format date as MM/DD/YYYY
    return date.toLocaleDateString();
  },
  format_amount: (amount) => {
    // format large numbers with commas
    return parseInt(amount).toLocaleString();
  },
  calculateCalories: function(exercise) {
    console.log(exercise, 11);
    const caloriesBurned=  (exercise.minutes / 60) * exercise.calories_per_hour
    //console.log(typeof exercise.calories_per_hour)
    return caloriesBurned.toFixed(2);
  },

  totalCalories:function(exercises) {
    var total = 0;
    exercises.forEach(function(exercise) {
        // total += calculateCalories(exercise.minutes, exercise.calories_perhour);
        total += (exercise.minutes / 60) * exercise.calories_per_hour
    });
      
    return total.toFixed(2);
  },

  totalNutritionCalories: function(nutrition){
    var total =0;
    nutrition.forEach(function(nutrition) {
      total+= nutrition.calorie_count_per_serving * nutrition.calorie_count_servings
    })
    return total.toFixed(2)
  }
}
