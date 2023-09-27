const delButtonHandler = async (event) => {
    if (event.target.hasAttribute('data-id')) {
        const id = event.target.getAttribute('data-id');
      
        const response = await fetch(`/api/workouts/${id}`, {
            method: 'DELETE',
        });
      
    if (response.ok) {
        document.location.reload()
    } else {
        alert('Failed to delete project');
    }
    }
    };
    
      document
        .querySelector('.exercise-list')
        .addEventListener('click', delButtonHandler)

