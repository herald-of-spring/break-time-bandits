const router = require('express').Router();
const { Race, UserRace } = require('../../models');
const withAuth = require('../../utils/auth');

router.post('/create', withAuth, async (req, res) => {
  try {
    const newRace = await Race.create(req.body);
    await UserRace.create({
      racer_choice: -1,
      participant_message: "",
      user_id: req.session.username,
      race_id: newRace.race_id
    })
    raceData = await UserRace.findAll({
      where: { id: req.params.race_id}
    });
    races = raceData.map((race) => race.get({ plain: true }));
    res.render('racepage', {
      user: req.session.username,
      isHost: true
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
      where: { id: req.params.id,
      },
    });
  
    if (updatedRace > 0) {
      res.status(200).end();
    } else {
      res.status(404).end();
    }
  } catch (err) {
    res.status(500).json(err);
  }
  });

module.exports = router;

