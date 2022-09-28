async function racepageFormHandler(event) {
    event.preventDefault();

    const user = document.querySelector('input[name="race-user"]').console.log(user);

    const racer_id = document.querySelector('input[name="racer-id"]').value;
    if (racer_id) {
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
.addEventListener('submit', racepageFormHandler);
