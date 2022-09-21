const newFormHandler = async (event) => {
  event.preventDefault();

  const name = document.querySelector('#user-name').value.trim();
  const userID = document.querySelector('#user-id').value.trim();
  const message = document.querySelector('#message').value.trim();

  if (name && userID && message) {
    const response = await fetch(`/api/projects`, {
      method: 'POST',
      body: JSON.stringify({ name, userID, message }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.ok) {
      document.location.replace('/race');
    } else {
      alert('Failed to create race');
    }
  }
};

const delButtonHandler = async (event) => {
  if (event.target.hasAttribute('data-id')) {
    const id = event.target.getAttribute('data-id');

    const response = await fetch(`/api/projects/${id}`, {
      method: 'DELETE',
    });

    if (response.ok) {
      document.location.replace('/race');
    } else {
      alert('Failed to delete race');
    }
  }
};

document
  .querySelector('.new-race-form')
  .addEventListener('submit', newFormHandler);

document
  .querySelector('.race-list')
  .addEventListener('click', delButtonHandler);
