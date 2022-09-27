const router = require('express').Router();
const { Race, UserRace } = require('../../models');
const withAuth = require('../../utils/auth');

router.post('/create', withAuth, async (req, res) => {
  try {
    const newRace = await Race.create(req.body);
    const hostSelection = await UserRace.create({
      racer_choice: -1,
      participant_message: "",
      user_id: req.session.username,
      race_id: newRace.race_id
    })
    res.render('race', {
      
    });
  } catch (err) {
    res.status(400).json(err);
  }
});

router.post('/select', withAuth, async (req, res) => {
  try {
    const raceData = await UserRace.create({
      ...req.body,
      user_id: req.session.username
    });

    res.status(200).json(raceData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post('/result', withAuth, async (req, res) => {
  try {
    const resultData = await Race.update({
      where: 
    })
  }
})

module.exports = router;
