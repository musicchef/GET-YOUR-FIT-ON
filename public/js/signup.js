const signupFormHandler = async (event) => {
    event.preventDefault();
    console.log("Your button worked!")
    //hook into the DOM
    const firstname = document.querySelector('#firstname-input').value.trim();
    const lastname = document.querySelector('#lastname-input').value.trim();
    const username = document.querySelector('#username-input').value.trim();
    const email = document.querySelector('#email-input').value.trim();
    const password = document.querySelector('#password-input').value.trim();
  //posting based on what is added to the signup page
    if (username && email && password) {
      const response = await fetch('/api/user/signup', {
        method: 'POST',
        body: JSON.stringify({
          first_name: firstname,
          last_name: lastname,
          username: username,
          email: email,
          password: password
         }),
        headers: { 'Content-Type': 'application/json' },
      });
  
      if (response.ok) {
        document.location.replace('/profile');
      } else {
        alert(response.statusText);
      }
    }
  };

  document
  .querySelector('.signup-form')
  .addEventListener('submit', signupFormHandler);