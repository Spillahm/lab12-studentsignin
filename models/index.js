let { Sequelize, DataTypes } = require( 'sequelize')

//environment variable is a variable store on a computer
let env = process.env.NODE_ENV || 'development' //set default if no environment variable

console.log('using environment' + env)

let configFile = require(__dirname + '/../config.json')
let config = configFile[env]

let password = process.env.DB_PASSWORD //undefined thus not needed to use with sqlite
// make use of the DB_PASSWORD environment variable at azure
config.password = password

let db = {}

let sequelize = new Sequelize(config)

let studentModelCreate = require('./student') //function definition

let studentModel = studentModelCreate(sequelize, DataTypes)

db[studentModel.name] = studentModel

db.sequelize = sequelize //sequelize configuration
db.Sequelize = Sequelize //Sequelize library

module.exports = db

