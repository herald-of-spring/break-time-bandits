const router = require('express').Router();
const { Op } = require('sequelize');
const { Race, User, UserRace } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', withAuth, async (req, res) => {
  try {
    const raceData = await Race.findAll({
      where: {
        gold: {
          [Op.is]: null
        }
      }
    });

    // Serializing data
    const race = raceData.map((race) => race.get({ plain: true }));

    // Pass serialized data and session flag into template
    res.render('homepage', { 
      race, 
      logged_in: req.session.logged_in 
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/race/:race_id', withAuth, async (req, res) => {
  try {
    const userData = await UserRace.findAll({
      where: { id: req.params.race_id }
    });

    const raceData = await Race.findByPk(req.params.race_id);

    const user = userData.get({ plain: true });
    const race = raceData.get({ plain: true });

    res.render('racepage', {
      ...user,
      currentUser: req.session.username,
      ...race
    });

  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/race/:race_id/results', withAuth, async (req, res) => {
  try {
    const raceData = await Race.findByPk(req.params.race_id);
    if (raceData.gold) {
      const goldData = await UserRace.findAll({
        race_id: req.params.race_id,
        racer_choice: raceData.gold
      });
      const silverData = await UserRace.findAll({
        race_id: req.params.race_id,
        racer_choice: raceData.silver
      });
      const bronzeData = await UserRace.findAll({
        race_id: req.params.race_id,
        racer_choice: raceData.bronze
      });

      const gold_racers = goldData.get({ plain: true });
      const silver_racers = silverData.get({ plain: true });
      const bronze_racers = bronzeData.get({ plain: true });
      const race = raceData.get({ plain: true });
      res.render('winners', {
        ...race,
        currentUser: req.session.username,
        ...gold_racers,
        ...silver_racers,
        ...bronze_racers
      });
    }
    else {
      redirector = "/race/" + req.params.race_id;
      res.redirect(redirector);
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

// Profiles and leaderboards can be implemented after, if time allows
// // Use withAuth middleware to prevent access to route
// router.get('/profile', withAuth, async (req, res) => {
//   try {
//     // Find the logged in user based on the session ID
//     const userData = await User.findByPk(req.session.user_id, {
//       attributes: { exclude: ['password'] },
//       include: [{ model: Project }],
//     });

//     const user = userData.get({ plain: true });

//     res.render('profile', {
//       ...user,
//       logged_in: true
//     });
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });

router.get('/login', (req, res) => {
  // If the user is already logged in, redirect the request to another route
  if (req.session.logged_in) {
    res.redirect('/');
    return;
  }

  res.render('login');
});

module.exports = router;
