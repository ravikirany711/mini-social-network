const express = require('express')
const gravatar = require('gravatar')
const bcrypt = require('bcryptjs')
const keys = require('../../config/keys')
const jwt = require('jsonwebtoken')
const passport = require('passport')
const router = express.Router()
const User = require('../../models/User')

router.get('/test', (req, res) => res.json({ msg: 'user works' }))



//Register user post request
router.post('/register', (req, res) => {
    User.findOne({ email: req.body.email })
        .then(user => {
            if (user) {
                return res.status(400).json({ email: 'Email already exists' })
            } else {
                const avatar = gravatar.url(req.body.email, {
                    s: '200',
                    r: 'pg',
                    d: 'mm'

                })
                const newUser = new User({
                    name: req.body.name,
                    email: req.body.email,
                    password: req.body.password,
                    avatar

                })
                bcrypt.genSalt(10, (err, salt) => {
                    bcrypt.hash(newUser.password, salt, (err, hash) => {
                        if (err) throw err;
                        newUser.password = hash;
                        newUser.save()
                            .then(user => res.json(user))
                            .catch(err => console.log(err))

                    })
                })
            }
        })

})

//Returning JWT token and can be accessed by public
router.post('/login', (req, res) => {
    const email = req.body.email;
    const password = req.body.password
    //Find user by email
    User.findOne({
        email: email,
    }).then(user => {
        if (!user) {
            return res.status(404).json({ email: 'User not found ' })
        }

        bcrypt.compare(password, user.password)
            .then(Matched => {
                if (Matched) {
                    //User matched
                    const payload = { id: user.id, name: user.name, avatar: user.avatar } //create jwt payload


                    //sign token
                    jwt.sign(payload, keys.secretOrKey, { expiresIn: 3600 },
                        (err, token) => {
                            res.json({
                                success: true,
                                token: 'Bearer' + token
                            })

                        })
                } else {
                    return res.status(400).json({ password: 'password incorrect' })
                }
            })
    })

})

//protected token user route
router.get('/current', passport.authenticate('jwt', { session: false })),
    (req, res) => {
        res.json({ msg: 'Success' })
    }




module.exports = router;
