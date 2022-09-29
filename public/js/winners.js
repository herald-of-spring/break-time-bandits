
const winnersformHandler = async function(event) {
  event.preventDefault();

  const race_id = document.querySelector('div.form-group > button').id;

  const gold = document.querySelector('#gold-racer').value.trim();
  const silver = document.querySelector('#silver-racer').value.trim();
  const bronze = document.querySelector('#bronze-racer').value.trim();
  const route = "/api/race/" + race_id + "/result";

  if (gold && silver && bronze) {
    await fetch(route, {
      method: 'PUT',
      body: JSON.stringify({
        gold,
        silver,
        bronze
      }),
      headers: { 'Content-Type': 'application/json' },
    });
  }
};
  
document
  .querySelector('#winners-form')
  .addEventListener('submit', winnersformHandler);