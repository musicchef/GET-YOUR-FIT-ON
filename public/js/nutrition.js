

const mealSetup = async () => {
    const response = await fetch (`/api/food`, {
         method: 'GET',
        })
        const data =await response.json();
        const nutrition = data.map((nutrition)=> nutrition.get({plain: true}));

        const breakfast = data.filter((meal)=> meal.meal_name==="Breakfast")
        const lunch = data.filter((meal)=> meal.meal_name==="Lunch")
        const dinner = data.filter((meal)=> meal.meal_name==="Dinner");
        const snack = data.filter((meal)=> meal.meal_name==="Snack");
        const bf= document.getElementById('breakfast')
        const lu=document.getElementById('lunch');
        const di= document.getElementById('dinner');
        const sn= document.getElementById('snack')

        breakfast.forEach(element=> {
            let card = document.createElement('div');
            let div= document.createElement('div');
            let header= document.createElement ('h4');
            let ul = document.createElement('ul');
            let totalCalories = document.createElement('li');
            let divbutton= document.createElement('div');
            let button= document.createElement('button');

            card.classList.add('row', 'mb-2');
            div.classList.add('col-md-8');
            divbutton.classList.add('col-md-4');
            button.classList.add('btn', 'btn-sm', 'btn-danger');
            button.addAttribute("data-id","nutrition.id");
            header.innerHTML = nutrition.food_name
            totalCalories.innerHTML = nutrition.calorie_count_per_serving * nutrition.calorie_count_servings;
            button.innerHTML= Delete;

            bf.append(card);
            card.append(div);
            div.append(header);
            div.append(ul);
            ul.append(totalCalories);
            card.append(divbutton);
            divbutton.append(button);
            
        }) 
        lunch.forEach(element=> {
            let card = document.createElement('div');
            let div= document.createElement('div');
            let header= document.createElement ('h4');
            let ul = document.createElement('ul');
            let totalCalories = document.createElement('li');
            let divbutton= document.createElement('div');
            let button= document.createElement('button');

            card.classList.add('row', 'mb-2');
            div.classList.add('col-md-8');
            divbutton.classList.add('col-md-4');
            button.classList.add('btn', 'btn-sm', 'btn-danger');
            button.addAttribute("data-id","nutrition.id");
            header.innerHTML = nutrition.food_name
            totalCalories.innerHTML = nutrition.calorie_count_per_serving * nutrition.calorie_count_servings;
            button.innerHTML= Delete;

            lu.append(card);
            card.append(div);
            div.append(header);
            div.append(ul);
            ul.append(totalCalories);
            card.append(divbutton);
            divbutton.append(button);
            
        });
        dinner.forEach(element=> {
            let card = document.createElement('div');
            let div= document.createElement('div');
            let header= document.createElement ('h4');
            let ul = document.createElement('ul');
            let totalCalories = document.createElement('li');
            let divbutton= document.createElement('div');
            let button= document.createElement('button');

            card.classList.add('row', 'mb-2');
            div.classList.add('col-md-8');
            divbutton.classList.add('col-md-4');
            button.classList.add('btn', 'btn-sm', 'btn-danger');
            button.addAttribute("data-id","nutrition.id");
            header.innerHTML = nutrition.food_name
            totalCalories.innerHTML = nutrition.calorie_count_per_serving * nutrition.calorie_count_servings;
            button.innerHTML= Delete;

            di.append(card);
            card.append(div);
            div.append(header);
            div.append(ul);
            ul.append(totalCalories);
            card.append(divbutton);
            divbutton.append(button);
            
        });
        snack.forEach(element=> {
            let card = document.createElement('div');
            let div= document.createElement('div');
            let header= document.createElement ('h4');
            let ul = document.createElement('ul');
            let totalCalories = document.createElement('li');
            let divbutton= document.createElement('div');
            let button= document.createElement('button');

            card.classList.add('row', 'mb-2');
            div.classList.add('col-md-8');
            divbutton.classList.add('col-md-4');
            button.classList.add('btn', 'btn-sm', 'btn-danger');
            button.addAttribute("data-id","nutrition.id");
            header.innerHTML = nutrition.food_name
            totalCalories.innerHTML = nutrition.calorie_count_per_serving * nutrition.calorie_count_servings;
            button.innerHTML= Delete;

            sn.append(card);
            card.append(div);
            div.append(header);
            div.append(ul);
            ul.append(totalCalories);
            card.append(divbutton);
            divbutton.append(button);
            
        });
    }
    
        
 mealSetup()   


// const delButtonHandler = async (event) => {
//     if (event.target.hasAttribute('data-id')) {
//         const id = event.target.getAttribute('data-id');
      
//         const response = await fetch(`/api/food${id}`, {
//             method: 'DELETE',
//         });
      
//     if (response.ok) {
//         document.location.replace('/dashboard');
//     } else {
//         alert('Failed to delete project');
//     }
//     }
//     };
    
//       document
//         .querySelector('.meal-list')
//         .addEventListener('click', delButtonHandler)

