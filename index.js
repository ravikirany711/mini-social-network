const express = require('express')

const app = express()

app.get('/', (req, res) => {
    res.send('express is up and running')
})

app.listen(process.env.PORT || 5000, (req, res) => {
    console.log('server is up and running on port 5000,go ahead')
})

