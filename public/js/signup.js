const loginFormHandler = async function(event) {
    event.preventDefault();
  
    const username = document.querySelector('#username-input-signup').value.trim();
    const password = document.querySelector('#password-input-signup').value.trim();
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