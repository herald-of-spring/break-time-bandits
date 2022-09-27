const router = require('express').Router();
const userRoutes = require('./userRoutes');
const raceRoutes = require('./raceRoutes');

router.use('/user', userRoutes);
router.use('/race', raceRoutes);

module.exports = router;
