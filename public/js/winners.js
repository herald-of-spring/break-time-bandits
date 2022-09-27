
const winnersformHandler = async function(event) {
    event.preventDefault();
  
    const gold_racers_id = document.querySelector('input[name="gold_racers"]').value;
    const silver_racers_id = document.querySelector('textarea[name="silver_racers"]').value;
    const bronze_racers_id = document.querySelector('textarea[name="bronze_racers"]').value;

  
    console.log(gold_racers_id);
    console.log(silver_racers_id);
    console.log(bronze_racers_id);
  
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