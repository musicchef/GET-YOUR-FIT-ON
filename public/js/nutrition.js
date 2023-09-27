const { Nutrition } = require("../../models");




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


