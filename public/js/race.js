// This is a formHandler for the race page in which the user  uses to put write race messsage 
const raceFormHandler = async (event) => {
  event.preventDefault();

  const race_id = document.querySelector('button').id;
  const racer_choice = document.querySelector('#racer-id').value.trim();
  const participant_message = document.querySelector('#participant-message').value.trim();

  if (racerID && message) {
    await fetch(`/api/race/select`, {
      method: 'POST',
      body: JSON.stringify({ racer_choice, participant_message, race_id }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

  }
};

// const delButtonHandler = async (event) => {
//   if (event.target.hasAttribute('data-id')) {
//     const id = event.target.getAttribute('data-id');

//     const response = await fetch(`/api/race/${id}`, {
//       method: 'DELETE',
//     });

//     if (response.ok) {
//       document.location.replace('/race');
//     } else {
//       alert('Failed to delete race');
//     }
//   }
// };

document
  .querySelector('#new-race-form')
  .addEventListener('submit', raceFormHandler);

// document
//   .querySelector('.race-list')
//   .addEventListener('click', delButtonHandler);
