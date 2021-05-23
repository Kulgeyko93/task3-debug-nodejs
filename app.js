require('dotenv').config();
const express = require('express');
const app = express();
const db = require('./db');
const user = require('./controllers/usercontroller');
const game = require('./controllers/gamecontroller')


const PORT = process.env.PORT || 4300;
app.use(express.json({ useNewUrlParser: true }));

// app.use(require('body-parser'));
app.use('/api/auth', user);
app.use(require('./middleware/validate-session'))
app.use('/api/game', game);

const start = async () => {
    try {
        // await db.authenticate();
        await db.sync();
        console.log('db is connested');
        app.listen(PORT,function() {
            console.log(`App is listening on ${PORT}`);
        })        
    } catch (e) {
        console.log(e)
    }
}

start();

