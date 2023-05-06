let express =require('express')
let api_routes = require('./routes/api.js')
let path = require('path')

//creates web application
let app = express()

let vueClientPath = path.join(__dirname, 'student-sign-in-client', 'dist')
app.use(express.static(vueClientPath))

//to manage json requests and convert data to Javascript
app.use(express.json())

app.use('/api', api_routes)

app.use(function(req, res, next) {
    res.status(404).send('Not found')

})
app.use(function(err, req, res, next) {
    console.error(err.stack) // for developers
    res.status(500).send('server error') //response to client
})

//start new server
let server = app.listen(process.env.PORT || 3000, function(){
    console.log('Express server running on port', server.address().port )
})
