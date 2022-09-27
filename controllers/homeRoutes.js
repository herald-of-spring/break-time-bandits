const router = require('express').Router();
const { Race, User } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', withAuth, async (req, res) => {
  try {
    const raceData = await Race.findAll({
      include: [
        {
          model: User,
          attributes: ['name'],
        },
      ],
    });

    // Serializing data
    const races = raceData.map((race) => race.get({ plain: true }));

    // Pass serialized data and session flag into template
    res.render('homepage', { 
      races, 
      logged_in: req.session.logged_in 
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/race/:race_id', withAuth, async (req, res) => {
  try {
    const raceData = await Race.findByPk(req.params.race_id, {
      include: [
        {
          model: User,
          attributes: ['name'],
        },
      ],
    });

    const race = raceData.get({ plain: true });

    res.render('race', {
      ...race,
      logged_in: req.session.logged_in
    });
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
