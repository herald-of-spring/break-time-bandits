const router = require('express').Router();
const { Race, UserRace } = require('../../models');
const withAuth = require('../../utils/auth');

router.post('/create', withAuth, async (req, res) => {
  try {
    const newRace = await Race.create(req.body);

    let redirector = "/race/" + newRace.race_id;
    res.redirect(redirector);
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

