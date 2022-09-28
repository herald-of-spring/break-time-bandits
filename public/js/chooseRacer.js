const raceFormHandler = async function(event) {
    event.preventDefault();
  
    const racer_id = document.querySelector('input[name="racer-id"]').value;
    const participant_message = document.querySelector('textarea[name="participant-message"]').value;
  
    console.log(racer_id);
    console.log(participant_message);
  
    await fetch(`/api/race`, {
      method: 'POST',
      body: JSON.stringify({
        raceName,
        raceTime,
      }),
      headers: { 'Race-Type': 'application/json' },
    });
  };
  
  document
    .querySelector('#winner-racer-form')
    .addEventListener('submit', raceFormHandler);