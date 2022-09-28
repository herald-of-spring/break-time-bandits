// This is a formHandler to create a new race form in the homepage.handlebars.
const loginFormHandler = async function(event) {
    event.preventDefault();
  
    const username = document.querySelector('#username-signup').value.trim();
    const password = document.querySelector('#password-signup').value.trim();
    console.log(username);
    console.log(password);
    const response = await fetch('/api/user', {
      method: 'POST',
      body: JSON.stringify({
        username, password
      }),
      headers: { 'Race-Type': 'application/json' },
    });
  
    if (response.ok) {
      document.location.replace('/main');
    } else {
      alert('Failed to sign up');
    }
  };
  
  document
    .querySelector('.signup-form')
    .addEventListener('submit', loginFormHandler);