const signupFormHandler = async (event) => {
    event.preventDefault();
    console.log("Your button worked!")
    // const username = document.querySelector('#name-signup').value.trim();
    // const email = document.querySelector('#email-signup').value.trim();
    // const password = document.querySelector('#password-signup').value.trim();
  
    // if (username && email && password) {
    //   const response = await fetch('/api/user/signup', {
    //     method: 'POST',
    //     body: JSON.stringify({ username, email, password }),
    //     headers: { 'Content-Type': 'application/json' },
    //   });
  
    //   if (response.ok) {
    //     document.location.replace('/profile');
    //   } else {
    //     alert(response.statusText);
    //   }
    // }
  };

  document
  .querySelector('#signup')
  .addEventListener('click', signupFormHandler);