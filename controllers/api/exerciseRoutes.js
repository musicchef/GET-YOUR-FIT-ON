const router = require('express').Router();
const { Exercise } = require('../../models/')

router.get('/', async (req, res) => {
    try {
        const exerciseData = await Exercise.findAll();

        res.status(200).json(exerciseData);
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;