const router = require('express').Router();
const { User, Exercise, Nutrition } = require('../../models/')

router.get('/', async (req, res) => {
    try {
        const nutritionData = await Nutrition.findAll({
            include: [
                {
                    model: User
                },
            ],
        });

        res.status(200).json(nutritionData);
    } catch (err) {
        res.status(500).json(err);
    }
})

module.exports = router;