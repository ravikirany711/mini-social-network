const express = require('express')
const router = express.Router()
const User = require('../../models/User')

router.get('/test', (req, res) => res.json({ msg: 'user works' }))



//Register user post request
router.post('/register', (req, res) => {
    User.findOne({ email: req.body.email })
        .then(user => {
            if (user) {
                return res.status(400).json({ email: 'Email already exists' })
            }
        })

})


module.exports = router;
