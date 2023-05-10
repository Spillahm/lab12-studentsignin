let Sequelize = require('sequelize')
let express = require('express')
const {sequelize} = require('../models')
let db = require('../models')
let Student = db.Student

let router = express.Router()

router.get('/students/:id', function(req, res, next){
    Student.findAll( {order:['present', 'name']} ).then( students => {
        return res.json(students)
    }).catch( err => next(err) )


})

router.get('/students/:id',function(req,res,next) {
    Student.findByPk(req.param.id).then(student => {
        if (student) {
            res.json(student)
        }else {
            res.status(404).send('Student not found')
        }
    }).catch( err => next(err))
})

router.post('/students', function(req,res, next){
    Student.create( req.body).then(data => {
        return res.status(201).send('ok')
    }).catch(err => {
    //hand user error
    if( err instanceof Sequelize.ValidationError ) {
        //respond with 400 Bad request error code with error message
        let messages = err.errors.map( e => e.message)
        return res.status(400).json(messages)
    }

    //something unexpected has happened
    return next(err)
})


router.patch('/students/:id',function(req, res, next){
   Student.update(
       req.body, {
           where: {
               id: req.params.id
           }
       }
   ).then( rowsModified => {
       if (!rowsModified [0]){
           return res.status(404).send('Not found')
       }else {
           return res.send('ok')
       }
       }).catch( err => {
        //if validation error that is a bad request e.g modify student to have no name
        if(err instanceof  Sequelize.ValidationError) {
         let messages = err.errors.map( (e) => e.message)
         return res.status(400).json(messages)
        }
            return next (err)

        })
})

router.delete('/students/:id', function(req, res, next){
   Student.destroy({where: {id: req.params.id}}).then( rowsModified => {
       return res.send('ok')
   }).catch( err => next(err) ) //unexpected errors

        })
})

module.exports = router

