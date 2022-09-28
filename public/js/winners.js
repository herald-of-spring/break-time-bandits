
const winnersformHandler = async function(event) {
    event.preventDefault();
  
    const username = document.querySelector('#username-input-signup').value.trim();
    const password = document.querySelector('#password-input-signup').value.trim();
    console.log(username);
    console.log(password);
  
    await fetch(`/api/race`, {
      method: 'POST',
      body: JSON.stringify({
        postTitle,
        postContent,
      }),
      headers: { 'Winners-Type': 'application/json' },
    });
  };
  
  document
    .querySelector('#winners-form')
    .addEventListener('submit', winnersformHandler);