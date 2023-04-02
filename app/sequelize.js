const { Sequelize } = require('sequelize');

// instance de la classe Sequelize , on parlera de notre client Sequelize
// on lui donne l'url de la base de donnée

const sequelize = new Sequelize(process.env.PG_URL, {
    define: {
        updatedAt: "updated_at",
        createdAt: "created_at"
    }
});


// et on l'exporte
 module.exports = sequelize;