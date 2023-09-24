const createExerciseButton = document.querySelector('.exercise-form');

const createExercise = async (event) => {
  event.preventDefault();
  const exerciseForm = document.getElementById('new-exercise-form')
  const exercise = document.querySelector('#categoriesselect1').value;
  const time= document.querySelector('#duration').value;

  if (comment ) {
    try {
      console.log(commentForm.dataset.id);
      const response = await fetch('/api/comments', {
        method: 'POST',
        body: JSON.stringify({ 
          comment, 
          blogpost_id: commentForm.dataset.id 
        }),
        headers: {
          'Content-Type': 'application/json',
        },
      });
      console.log(response);
      if (response.ok) {
        document.location.reload();
      } else {
        alert('Failed to add comment');
      }
    } catch (err) {
    console.log(err);
  }
}}
;


createCommentButton.addEventListener('submit', createComment);