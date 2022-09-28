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
    let redirector = "/race/" + raceData.race_id;
    res.redirect(redirector);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post('/:race_id/result', withAuth, async (req, res) => {
  try {
    const resultData = await Race.update(req.body, {
      where: {race_id: race_id}
    });

    if (resultData) {
      let redirector = "/race/" + resultData.race_id + "/results";
      res.redirect(redirector);
    }
    else {
      res.status(404);
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/:race_id/result', withAuth, async (req, res) => {
  try {
    const resultData = await Race.findByPk(req.params.race_id);

    if (resultData.gold) {
      let redirector = "/race/" + resultData.race_id + "/results";
      res.redirect(redirector);
    }
    else {
      res.status(400);
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;

