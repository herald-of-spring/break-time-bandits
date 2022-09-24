const router = require('express').Router();
const { Race } = require('../../models');
const withAuth = require('../../utils/auth');

router.post('/', withAuth, async (req, res) => {
  try {
    const newRace = await Race.create({
      ...req.body,
      user_id: req.session.user_id,
    });

    res.status(200).json(newRace);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.delete('/:id', withAuth, async (req, res) => {
  try {
    const raceData = await Race.destroy({
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
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

module.exports = router;
