const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const passport = require('passport')

const user = require('./routes/api/user')
const profile = require('./routes/api/profile')
const posts = require('./routes/api/posts')


const app = express()

//Body-Parser middleware
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())


//connecting to database
const db = require('./config/keys').mongoURI
mongoose.connect(db)
    .then(() => console.log('Mongodb connected'))
    .catch((err) => console.log(err))






//Passport middleware
app.use(passport.initialize())

//passport config
require('./config/passport')(passport)



//Use Routes
app.use('/api/user', user)
app.use('/api/profile', profile)
app.use('/api/posts', posts)



app.listen(process.env.PORT || 5000, (req, res) => {
    console.log('server is up and running on port 5000,go ahead')
})

