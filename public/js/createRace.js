// This is a formHandler to create a new race form in the homepage.handlebars.
async function newRaceFormHandler(event) {
    event.preventDefault();

    const user = document.querySelector('#race-id').value.trim()
    console.log(user);

    const racer_name= document.querySelector('#racer-name').value.trim();
    if (racer_name) {
        const response = await fetch('/api/race', {
            method: 'POST',
            body: JSON.stringify({
                postId,
                comment_content
            }),
            headers: {
                'Race-Type': 'application/json'
            }
        });

        if (response.ok) {
            document.location.reload();

        } else {
            alert(response.statusText);
        }
    }
}

document.querySelector('#racer-choice-form')
.addEventListener('submit', newRaceFormHandler);
