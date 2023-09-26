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
    
    //console.log(typeof exercise.calories_per_hour)
    return (exercise.minutes / 60) * exercise.calories_per_hour;
  },

  totalCalories:function(exercises) {
    var total = 0;
    exercises.forEach(function(exercise) {
        // total += calculateCalories(exercise.minutes, exercise.calories_perhour);
        total += (exercise.minutes / 60) * exercise.calories_per_hour
    });
      
    return total;
  }
}
