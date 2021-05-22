const router = require('express').Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

router.post('/signup', (req, res) => {
    try {
        const body = req.body

        const user = await User.create({
        full_name: body.full_name,
        username: body.username,
        passwordhash: bcrypt.hashSync(body.password, 10),
        email: body.email,
    });

        if (!user) res.status(404).json("Not found");

        let token = jwt.sign({ id: user.id }, 'lets_play_sum_games_man', { expiresIn: 60 * 60 * 24 });
        res.status(200).json({
            user: user,
            token: token
        });

        res.status(200).json(`games: ${user}`);
    } catch (e) {
        res.status(500).json(e);
    }
})

router.post('/signin', (req, res) => {
    try {
        const body = req.body

        const user = await User.findOne({ where: { username: body.username } })

        if (user) {
            bcrypt.compare(req.body.password, passwordHash, function (err, matches) {
                if (matches) {
                    var token = jwt.sign({ id: id }, 'lets_play_sum_games_man', { expiresIn: 60 * 60 * 24 });
                    res.json({
                        user: user,
                        message: "Successfully authenticated.",
                        sessionToken: token
                    });
                } else {
                    res.status(502).send({ error: "Passwords do not match." })
                }
            });
        } else {
            res.status(403).send({ error: "User not found." })
        }
    } catch (e) {
        res.status(500).json(e);
    }
})

module.exports = router;