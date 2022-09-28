const homepageHandler = async function(event) {
    event.preventDefault();
  
    const raceName = document.querySelector('input[name="race-name"]').value;
    const raceTime = document.querySelector('textarea[name="post-body"]').value;
  
    console.log(raceName);
    console.log(raceTime);
  
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
    .querySelector('#new-race-form')
    .addEventListener('submit', homepageHandler);