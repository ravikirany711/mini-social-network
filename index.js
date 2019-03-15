const express = require('express')
const mongoose = require('mongoose')

const user = require('./routes/api/user')
const profile = require('./routes/api/profile')
const posts = require('./routes/api/posts')


const app = express()

//connecting to database
const db = require('./config/keys').mongoURI
mongoose.connect(db)
    .then(() => console.log('Mongodb connected'))
    .catch((err) => console.log(err))





app.get('/', (req, res) => {
    res.send('express is up and running')
})


//Use Routes
app.use('/api/user', user)
app.use('/api/profile', profile)
app.use('/api/posts', posts)



app.listen(process.env.PORT || 5000, (req, res) => {
    console.log('server is up and running on port 5000,go ahead')
})

