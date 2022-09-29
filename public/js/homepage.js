// when user is on homepage.handlebars and click's the "join" button from current races list, they should be directed to the race.handlebars so that they can file

const joinBtn = document.querySelectorAll('.join-btn');

joinBtn.forEach((btn) => {
    btn.addEventListener('click', () => {
        reroute = "/join/" + btn.id;
        document.location.href= reroute;
    })
});
