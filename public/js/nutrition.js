const mealSetup = async () => {
    
    const response = await fetch ('/api/food/getmeal', {
         method: 'GET',
        })
        const data =await response.json();
       
//filter the data based on the meal_name
        const breakfast = data.filter((meal)=> meal.meal_name==="Breakfast")
        const lunch = data.filter((meal)=> meal.meal_name==="Lunch")
        const dinner = data.filter((meal)=> meal.meal_name==="Dinner");
        const snack = data.filter((meal)=> meal.meal_name==="Snacks");
        const explored = data.filter((meal) => meal.meal_name==="Explored")
        //hook into the DOM
        const bf= document.getElementById('breakfast')
        const lu=document.getElementById('lunch');
        const di= document.getElementById('dinner');
        const sn= document.getElementById('snack');
        const ex = document.getElementById('explored');
        let allCalories= 0
//card made for each breakfast item
        breakfast.forEach((element)=> {
            let card = document.createElement('div');
            let div= document.createElement('div');
            let header= document.createElement ('h5');
            let ul = document.createElement('ul');
            let totalCalories = document.createElement('li');
            let divbutton= document.createElement('div');
            let button= document.createElement('button');

            card.classList.add('row', 'mb-2');
            div.classList.add('col-md-8');
            divbutton.classList.add('col-md-4');
            totalCalories.classList.add('totalCalories')
            button.classList.add('btn', 'btn-sm', 'btn-danger');
            button.setAttribute("data-id",element.id);
            header.innerHTML = element.food_name
            let itemCalories= element.calorie_count_per_serving * element.calorie_count_servings
            allCalories += itemCalories
            totalCalories.innerHTML ="Total Calories: "+itemCalories;
            button.innerHTML= "Delete";

            bf.append(card);
            card.append(div);
            div.append(header);
            div.append(ul);
            ul.append(totalCalories);
            card.append(divbutton);
            divbutton.append(button);
            
        }) 
        //all the sections for lunch
        lunch.forEach(element=> {
            let card = document.createElement('div');
            let div= document.createElement('div');
            let header= document.createElement ('h5');
            let ul = document.createElement('ul');
            let totalCalories = document.createElement('li');
            let divbutton= document.createElement('div');
            let button= document.createElement('button');

            card.classList.add('row', 'mb-2');
            div.classList.add('col-md-8');
            totalCalories.classList.add('totalCalories')
            divbutton.classList.add('col-md-4');
            button.classList.add('btn', 'btn-sm', 'btn-danger');
            button.setAttribute("data-id",element.id);
            header.innerHTML = element.food_name
            let itemCalories= element.calorie_count_per_serving * element.calorie_count_servings
            allCalories += itemCalories
            totalCalories.innerHTML ="Total Calories: "+itemCalories;
            button.innerHTML= "Delete";

            lu.append(card);
            card.append(div);
            div.append(header);
            div.append(ul);
            ul.append(totalCalories);
            card.append(divbutton);
            divbutton.append(button);
            
        });
        //card created for each for dinner
        dinner.forEach(element=> {
            let card = document.createElement('div');
            let div= document.createElement('div');
            let header= document.createElement ('h5');
            let ul = document.createElement('ul');
            let totalCalories = document.createElement('li');
            let divbutton= document.createElement('div');
            let button= document.createElement('button');

            card.classList.add('row', 'mb-2');
            div.classList.add('col-md-8');
            divbutton.classList.add('col-md-4');
            totalCalories.classList.add('totalCalories')
            button.classList.add('btn', 'btn-sm', 'btn-danger');
            button.setAttribute("data-id",element.id);
            header.innerHTML = element.food_name
            let itemCalories= element.calorie_count_per_serving * element.calorie_count_servings
            allCalories += itemCalories
            totalCalories.innerHTML ="Total Calories: "+itemCalories;
            button.innerHTML= "Delete";

            di.append(card);
            card.append(div);
            div.append(header);
            div.append(ul);
            ul.append(totalCalories);
            card.append(divbutton);
            divbutton.append(button);
            
        });
        //card created for each snack
        snack.forEach(element=> {
            let card = document.createElement('div');
            let div= document.createElement('div');
            let header= document.createElement ('h5');
            let ul = document.createElement('ul');
            let totalCalories = document.createElement('li');
            let divbutton= document.createElement('div');
            let button= document.createElement('button');

            card.classList.add('row', 'mb-2');
            div.classList.add('col-md-8');
            divbutton.classList.add('col-md-4');
            totalCalories.classList.add('totalCalories')
            button.classList.add('btn', 'btn-sm', 'btn-danger');
            button.setAttribute("data-id",element.id);
            header.innerHTML = element.food_name
            let itemCalories= element.calorie_count_per_serving * element.calorie_count_servings
            allCalories += itemCalories
            totalCalories.innerHTML ="Total Calories: "+itemCalories;
            button.innerHTML= "Delete";

            sn.append(card);
            card.append(div);
            div.append(header);
            div.append(ul);
            ul.append(totalCalories);
            card.append(divbutton);
            divbutton.append(button);
            
        });
        //card created for each explored
        explored.forEach((element)=> {
            let card = document.createElement('div');
            let div= document.createElement('div');
            let header= document.createElement ('h5');
            let ul = document.createElement('ul');
            let totalCalories = document.createElement('li');
            let divbutton= document.createElement('div');
            let button= document.createElement('button');

            card.classList.add('row', 'mb-2');
            div.classList.add('col-md-8');
            divbutton.classList.add('col-md-4');
            totalCalories.classList.add('totalCalories')
            button.classList.add('btn', 'btn-sm', 'btn-danger');
            button.setAttribute("data-id",element.id);
            header.innerHTML = element.food_name
            let itemCalories= element.calorie_count_per_serving * element.calorie_count_servings
            allCalories += itemCalories
            totalCalories.innerHTML =itemCalories;
            button.innerHTML= "Delete";

            ex.append(card);
            card.append(div);
            div.append(header);
            div.append(ul);
            ul.append(totalCalories);
            card.append(divbutton);
            divbutton.append(button);
    })
        const alloftheCalories=document.getElementById("totalCalories");
        alloftheCalories.innerHTML= allCalories;     

    }
    
 mealSetup()   

//delete button  and deleting nutrition items based on data-id
const delButtonHandler = async (event) => {
    if (event.target.hasAttribute('data-id')) {
        const id = event.target.getAttribute('data-id');
      
        const response = await fetch(`/api/food/${id}`, {
            method: 'DELETE',
        });
      
    if (response.ok) {
        document.location.reload();
    } else {
        alert('Failed to delete project');
    }
    }
    };
    
      document
        .querySelector('.meal-list')
        .addEventListener('click', delButtonHandler)

