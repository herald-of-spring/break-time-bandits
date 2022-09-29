// when user is on homepage.handlebars and click's the "join" button from current races list, they should be directed to the race.handlebars so that they can file

const joinBtn = document.querySelectorAll('.join-btn');

joinBtn.forEach((btn) => {
    btn.addEventListener('click', () => {
        reroute = "/join/" + btn.id;
        document.location.href= reroute;
    })
});

const createRace = async function(event) {
    event.preventDefault();
  
    const name = document.querySelector('#race-name').value.trim();
    // const raceTime = document.querySelector('#race-time').value.trim();

    if (name) {
      await fetch(`/api/race/create`, {
        method: 'POST',
        body: JSON.stringify({
          name,
        }),
        headers: { 'Content-Type': 'application/json' },
      });
    }
  };
  
  document
    .querySelector('#new-race-form')
    .addEventListener('submit', createRace);