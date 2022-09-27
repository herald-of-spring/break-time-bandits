const router = require('express').Router();
const { Race, userRace } = require('../../models');
const withAuth = require('../../utils/auth');

router.post('/', withAuth, async (req, res) => {
  try {
    const newRace = await Race.create({
      ...req.body,
      racer_id: req.session.racer_id,
    });

    res.status(200).json(newRace);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.post('/choice', withAuth, async (req, res) => {
  try {
    const raceData = await userRace.create({
      where: {
        id: req.params.id,
        racer_id: req.session.racer_id,
      },
    });

    if (!raceData) {
      res.status(404).json({ message: 'No race found with this id!' });
      return;
    }

    res.status(200).json(raceData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Anh Nguyen Duc
  // 7:43 PM
  // POST {   //student-side
  // racer_choice: number,
  // participant_message: string
  // }
  // route: POST /choice
module.exports = router;
