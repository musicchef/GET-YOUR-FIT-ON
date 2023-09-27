const { Nutrition } = require("../../models");

const mealSetup = async (event) => {
        const response = await fetch (`/api/food`, {
            method: 'GET',
        })
    }
        router.get('/', withAuth, async (req, res) => {
            try {
                const nutritionData = await Nutrition.findAll({
                      where: {
                        user_id: req.session.user_id,
                        meal_date : dayjs().format('YYYY-MM-DD')  
                      } 
                });
                const nutrition = nutritionData.map((nutrition)=> nutrition.get({plain: true}));
                res.render('nutrition', {
                 nutrition,
                logged_in: req.session.logged_in })
                
            } catch (err) {
                res.status(500).json(err);
            }
        });



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

