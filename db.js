const Sequelize = require('sequelize');

//database username   password
const sequelize = new Sequelize(
    process.env.DB,
    process.env.USERNAME,
    process.env.DB_PASS,
    {
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        dialect: 'postgres'
    }
)

sequelize.authenticate().then(
    function success() {
        console.log("Connected to DB");
},

    function fail(err) {
        console.log(`Error: ${err}`);
    }
)

module.exports = sequelize;