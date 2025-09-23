const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Movies =  sequelize.define('Movies', {
    title :{
        type: DataTypes.STRING,
        allowNull:false,
    },
    synopsis :{
        type: DataTypes.STRING,
        allowNull:false,
    },
    posterURL :{
        type: DataTypes.STRING,
        allowNull:false,
    },
    trailerURL :{
        type: DataTypes.STRING,
        allowNull:false,
    },
    genre :{
        type: DataTypes.STRING,
        allowNull:false,
    },
    duration :{
        type: DataTypes.INTEGER,
        allowNull:false,
    },
    ageRating :{
        type: DataTypes.FLOAT,
        allowNull:false,
    },
    releaseDate :{
        type: DataTypes.STRING,
        allowNull:false,
    },
    isActive:{
        type: DataTypes.BOOLEAN,
        allowNull:false,
    },
})

module.exports = Movies;