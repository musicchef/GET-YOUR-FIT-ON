module.exports = {
  format_date: (date) => {
    // Format date as MM/DD/YYYY
    return date.toLocaleDateString();
  },
  format_amount: (amount) => {
    // format large numbers with commas
    return parseInt(amount).toLocaleString();
  },
  calculateCalories: function(minutes, calories_per_hour) {
    return (minutes / 60) * calories_per_hour;
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
