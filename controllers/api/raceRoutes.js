const router = require('express').Router();
const { Race, UserRace, User } = require('../../models');
const withAuth = require('../../utils/auth');
const randomize = require('../../utils/randomize');
const chalk = require('chalk');

router.post('/create', withAuth, async (req, res) => {
  try {
    new_id = randomize();
    const collision = await Race.findOne(new_id);
    if (collision && collision.gold) {    //cleanup old *finished* races in case there is a collision
      await Race.destroy(new_id);
      let racer_collisions;
      while (true) {
        racer_collisions = await UserRace.findOne({
          where: {
            race_id: new_id
          }
        })
        if (!racer_collisions) {
          break;
        }
        await UserRace.destroy({
          where: {
            race_id: new_id
          }
        })
      }
    }
    const newRace = await Race.create({
      race_id: new_id,
      ...req.body,
      host: req.session.username
    });
    console.log(chalk.red("newRace", newRace));
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
    console.log(chalk.blue("raceData", raceData));
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
    console.log(chalk.red("resultData", resultData));
    if (resultData) {
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
      for (let user of gold_racers) {
        let userData = await User.findOne(user.user_id);
        if (!userData.gold) {    //values have not been initialized
          userData.update({
            "gold": 1,
            "silver": 0,
            "bronze": 0
          })
        }
        else {
          userData.increment("gold", {by: 1});
        }
      }
      for (let user of silver_racers) {
        let userData = await User.findOne(user.user_id);
        if (!userData.silver) {    //values have not been initialized
          userData.update({
            "gold": 0,
            "silver": 1,
            "bronze": 0
          })
        }
        else {
          userData.increment("silver", {by: 1});
        }
      }
      for (let user of bronze_racers) {
        let userData = await User.findOne(user.user_id);
        if (!userData.bronze) {    //values have not been initialized
          userData.update({
            "gold": 0,
            "silver": 0,
            "bronze": 1
          })
        }
        else {
          userData.increment("bronze", {by: 1});
        }
      }

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

