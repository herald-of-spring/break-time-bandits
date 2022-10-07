const router = require('express').Router();
const { Race, UserRace, User } = require('../models');
const withAuth = require('../utils/auth');
const chalk = require('chalk');

router.get('/', withAuth, async (req, res) => {
  try {
    const raceData = await Race.findAll({
      where: {
        gold: null
      }
    });

    const userData = await User.findAll({
      order: [
        ["gold", "DESC"]
      ],
      limit: 5
    })
    // Serializing data
    const race = raceData.map((race) => race.get({ plain: true }));
    const user = userData.map((user) => user.get({ plain: true }));
    // Pass serialized data and session flag into template
    console.log(chalk.blue("race", race));
    res.render('homepage', { 
      race,
      user,
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
      res.redirect(303, redirector);
    }
    else {
      const userRaceData = await UserRace.findOne({
        where: {
          user_id: req.session.username,
          race_id: req.params.race_id
        }
      })

      const race = raceData.get({ plain: true });
      console.log(chalk.red("race", race));
      if (raceData.host == req.session.username || userRaceData) {
        redirector = "/race/" + req.params.race_id;
        res.redirect(303, redirector);
      }
      else {
        res.render('race', {
          username: req.session.username,
          race,
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
      res.redirect(303, redirector);
    }
    else {
      const isEnrolled = await UserRace.findOne({
        where: {
          race_id: req.params.race_id,
          user_id: req.session.username
        }
      })
      if (!isEnrolled) {
        redirector = "/join/" + req.params.race_id;
        res.redirect(303, redirector);
      }
      const userData = await UserRace.findAll({
        where: { race_id: req.params.race_id }
      });

      const user = userData.map((u) => u.get({ plain: true }));
      const race = raceData.get({ plain: true });
      console.log(chalk.red("user", user));
      console.log(chalk.blue("race", race));
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
    console.log(chalk.yellow("raceData", raceData))
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

      console.log(chalk.red("race", race));
      console.log(chalk.yellow("gold_racers", gold_racers));
      console.log(chalk.blue("silver_racers", silver_racers));
      console.log(chalk.green("bronze_racers", bronze_racers));
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
      res.redirect(303, redirector);
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

// Use withAuth middleware to prevent access to route
router.get('/profile', withAuth, async (req, res) => {
  try {
    // Find the logged in user based on the session ID
    const userData = await User.findByPk(req.session.username);

    const user = userData.get({ plain: true });

    res.render('profile', {
      user,
      logged_in: req.session.logged_in
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/patch', withAuth, async (req, res) => {
  res.render('patch');
})

router.get('/login', (req, res) => {
  // If the user is already logged in, redirect the request to another route
  if (req.session.logged_in) {
    res.redirect('/');
    return;
  }

  res.render('login');
});

module.exports = router;
