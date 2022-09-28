// when user is on homepage.handlebars and click's the "join" button from current races list, they should be directed to the race.handlebars so that they can file

const joinBtn = document.querySelector('join-btn');
const toRace = () => {
    document.location.href="../../views/race.handlebars";
}

joinBtn.addEventListener('click', toRace);
