const router = require('express').Router();
const { Race, UserRace } = require('../../models');
const withAuth = require('../../utils/auth');
const randomize = require('../../utils/randomize');

router.post('/create', withAuth, async (req, res) => {
  try {
    const newRace = await Race.create({
      race_id: randomize(),
      ...req.body,
      host: req.session.username
    });
    console.log("newRace", newRace);
    let redirector = "/race/" + newRace.race_id;
    res.json({redirect: redirector});
    // res.redirect(303, redirector);
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
    console.log("raceData", raceData);
    let redirector = "/race/" + raceData.race_id;
    res.json({redirect: redirector});
    // res.redirect(303, redirector);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.put('/:race_id/result', withAuth, async (req, res) => {
  try {
    const resultData = await Race.update(req.body, {
      where: {race_id: req.params.race_id}
    });
    console.log("resultData", resultData);
    if (resultData) {
      let redirector = "/race/" + req.params.race_id + "/results";
      res.json({redirect: redirector});
      // res.redirect(303, redirector);
    }
    else {
      res.status(404);
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

// router.get('/:race_id/result', withAuth, async (req, res) => {
//   try {
//     const resultData = await Race.findByPk(req.params.race_id);
//     console.log("resultData", resultData);
//     if (resultData.gold) {
//       let redirector = "/race/" + req.params.race_id + "/results";
//       res.redirect(redirector);
//     }
//     else {
//       res.status(400);
//     }
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });

module.exports = router;

