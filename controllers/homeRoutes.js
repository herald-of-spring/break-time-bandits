const router = require('express').Router();
const { Race, UserRace } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', withAuth, async (req, res) => {
  try {
    const raceData = await Race.findAll({
      where: {
        gold: null
      }
    });

    // Serializing data
    const race = raceData.map((race) => race.get({ plain: true }));
    // Pass serialized data and session flag into template
    console.log("race", race);
    res.render('homepage', { 
      race, 
      logged_in: req.session.logged_in 
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/join/:race_id', withAuth, async (req, res) => {
  try {
    const raceData = await Race.findByPk(req.params.race_id);

    if (raceData.gold) {
      let redirector = "/race/" + req.params.race_id + "/results";
      res.redirect(redirector);
    }
    else {
      const userRaceData = await UserRace.findOne({
        where: {
          user_id: req.session.username,
          race_id: req.params.race_id
        }
      })

      const race = raceData.get({ plain: true });
      console.log("race", race);
      if (raceData.host == req.session.username || userRaceData) {
        redirector = "/race/" + req.params.race_id;
        res.redirect(redirector);
      }
      else {
        res.render('race', {
          username: req.session.username,
          race_id: req.params.race_id,
          race_name: race.name,
          logged_in: req.session.logged_in 
        });
      }
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/race/:race_id', withAuth, async (req, res) => {
  try {
    const raceData = await Race.findByPk(req.params.race_id);
    
    if (raceData.gold) {
      let redirector = "/race/" + req.params.race_id + "/results";
      res.redirect(redirector);
    }
    else {
      const userData = await UserRace.findAll({
        where: { race_id: req.params.race_id }
      });

      const user = userData.map((u) => u.get({ plain: true }));
      const race = raceData.get({ plain: true });
      console.log("user", user);
      console.log("race", race);
      res.render('racepage', {
        user,
        currentUser: req.session.username,
        race,
        logged_in: req.session.logged_in,
        isHost: req.session.username == race.host, 
      });
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/race/:race_id/results', withAuth, async (req, res) => {
  try {
    const raceData = await Race.findByPk(req.params.race_id);
    console.log("raceData", raceData)
    if (raceData.gold) {
      const goldData = await UserRace.findAll({
        where: {
          race_id: req.params.race_id,
          racer_choice: raceData.gold
        }
      });
      const silverData = await UserRace.findAll({
        where: {
          race_id: req.params.race_id,
          racer_choice: raceData.silver
        }
      });
      const bronzeData = await UserRace.findAll({
        where: {
          race_id: req.params.race_id,
          racer_choice: raceData.bronze
        }
      });
      
      const gold_racers = goldData.map((u) => u.get({ plain: true }));
      const silver_racers = silverData.map((u) => u.get({ plain: true }));
      const bronze_racers = bronzeData.map((u) => u.get({ plain: true }));
      const race = raceData.get({ plain: true });

      console.log("race", race);
      console.log("gold_racers", gold_racers);
      console.log("silver_racers", silver_racers);
      console.log("bronze_racers", bronze_racers);
      res.render('winners', {
        race,
        currentUser: req.session.username,
        gold_racers,
        silver_racers,
        bronze_racers,
        logged_in: req.session.logged_in
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
