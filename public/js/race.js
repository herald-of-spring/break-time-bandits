// This is a formHandler for the race page in which the user  uses to put write race messsage 
const raceFormHandler = async (event) => {
  event.preventDefault();

  const racerID = document.querySelector('#racer-id').value.trim();
  const message = document.querySelector('#participant-message').value.trim();

  if (racerID && message) {
    const response = await fetch(`/api/race`, {
      method: 'POST',
      body: JSON.stringify({ user_id, racer_id, message }),
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

    const response = await fetch(`/api/race/${id}`, {
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
  .addEventListener('submit', raceFormHandler);

document
  .querySelector('.race-list')
  .addEventListener('click', delButtonHandler);
