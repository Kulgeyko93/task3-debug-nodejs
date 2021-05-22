const router = require('express').Router();
const Game = require('../models/game');

router.get('/all', async (req, res) => {
    try {
        const games = await Game.findAll({ where: { owner_id: req.user.id } });

        if (!games)  res.status(404).json("Not found");

        res.status(200).json(`games: ${games}`);
    } catch (e) {
        res.status(500).json(e);
    }
})

router.get('/:id', (req, res) => {
    try {
        const game = await Game.findOne({ where: { id: req.params.id, owner_id: req.user.id } });

        if (!game)  res.status(404).json("Not found");

        res.status(200).json(`games: ${game}`);
    } catch (e) {
        res.status(500).json(e);
    }
})

router.post('/create', (req, res) => {
    try {
        const game = await Game.create({
            title: req.body.game.title,
            owner_id: req.body.user.id,
            studio: req.body.game.studio,
            esrb_rating: req.body.game.esrb_rating,
            user_rating: req.body.game.user_rating,
            have_played: req.body.game.have_played
        });

        if (!game)  res.status(404).json("Not found");

        res.status(200).json(`games: ${game}, Game created.`);
    } catch (e) {
        res.status(500).json(e);
    }
})

router.put('/update/:id', (req, res) => {
    try {
        const gameUpdate = Game.update({
            title: req.body.game.title,
            studio: req.body.game.studio,
            esrb_rating: req.body.game.esrb_rating,
            user_rating: req.body.game.user_rating,
            have_played: req.body.game.have_played
        },
            {
                where: {
                    id: req.params.id,
                    owner_id: req.user
                }
            });

        if (!gameUpdate)  res.status(404).json("Not found");

        res.status(200).json(`games: ${gameUpdate}, Game created.`);
    } catch (e) {
        res.status(500).json(e);
    }
})

router.delete('/remove/:id', (req, res) => {
    try {
        const game = Game.destroy({
            where: {
                id: req.params.id,
                owner_id: req.user.id
            }
        });

        if (!game)  res.status(404).json("Not found");

        res.status(200).json(`games: ${game}, Game created.`);
    } catch (e) {
        res.status(500).json(e);
    }
})

module.exports = router;