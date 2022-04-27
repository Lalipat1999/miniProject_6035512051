
const express = require('express'),
app = express(),
passport = require('passport'),
port = process.env.PORT || 80,
cors = require('cors'),
cookie = require('cookie')

const bcrypt = require('bcrypt')

const db = require('./database.js')
let users = db.users

require('./passport.js')

const router = require('express').Router(),
jwt = require('jsonwebtoken')

app.use('/api', router)
router.use(cors({ origin: 'http://localhost:3000', credentials: true }))
// router.use(cors())
router.use(express.json())
router.use(express.urlencoded({ extended: false }))

let shops = {
    list: [
        { id: 1, name: "BTS MAP OF THE SOUL PERSONA", price:588, Deliverycost:"Ems"  ,Delivery:50, imageurl:"https://i.pinimg.com/564x/1a/e5/1d/1ae51de49c5ab33e68f97ecbd330c903.jpg"},
        { id: 2, name: "EXO Official Lightstick Ver.3", price:1420, Deliverycost:"Ems"  ,Delivery:50, imageurl:"https://i.pinimg.com/564x/65/f9/7c/65f97c1f1c431d3ee81ab4490f6a248d.jpg"},
        { id: 3, name: "ENHYPEN - Album [DIMENSION : ANSWER]", price:828, Deliverycost:"Ems"  ,Delivery:50, imageurl:"https://i.pinimg.com/564x/d3/5c/43/d35c43b3c669f37014497ed96f8b1d8b.jpg" },
        { id: 4, name: "TXT (TOMORROW X TOGETHER) - The Chaos Chapter : Fight or Escape", price:775, Deliverycost:"Ems"  ,Delivery:50, imageurl:"https://i.pinimg.com/564x/ab/c6/6e/abc66e62f6766590a616191790eee2c0.jpg"},
        { id: 5, name: "BT21 - Turntable Bluetooth Speaker", price:2323, Deliverycost:"Ems"  ,Delivery:50, imageurl:"https://i.pinimg.com/564x/c8/ac/69/c8ac695053c670b17d604f23ab7a301c.jpg"},
    ]
    
}
let income = 0

router.post('/login', (req, res, next) => {
passport.authenticate('local', { session: false }, (err, user, info) => {
    console.log('Login: ', req.body, user, err, info)
    if (err) return next(err)
    if (user) {
        const token = jwt.sign(user, db.SECRET, {
            expiresIn: '1d'
        })
        // req.cookie.token = token
        res.setHeader(
            "Set-Cookie",
            cookie.serialize("token", token, {
                httpOnly: true,
                secure: process.env.NODE_ENV !== "development",
                maxAge: 60 * 60,
                sameSite: "strict",
                path: "/",
            })
        );
        res.statusCode = 200
        return res.json({ user, token })
    } else
        return res.status(422).json(info)
})(req, res, next)
})

router.get('/logout', (req, res) => {
res.setHeader(
    "Set-Cookie",
    cookie.serialize("token", '', {
        httpOnly: true,
        secure: process.env.NODE_ENV !== "development",
        maxAge: -1,
        sameSite: "strict",
        path: "/",
    })
);
res.statusCode = 200
return res.json({ message: 'Logout successful' })
})

/* GET user profile. */
router.get('/profile',
passport.authenticate('jwt', { session: false }),
(req, res, next) => {
    res.send(req.user)
});

router.get('/comment',
passport.authenticate('jwt', { session: false }),
(req, res, next) => {
    res.send('comment')
});

router.route('/shops')
.get((req, res) => res.json(shops.list))
.post((req, res) => {
    console.log(req.body)
    let newshop = {}
    newshop.id = (shops.list.length) ? shops.list[shops.list.length - 1].id + 1 : 1
    newshop.name = req.body.name
    newshop.price = req.body.price
    newshop.Deliverycost = req.body.Deliverycost
    newshop.Delivery = req.body.Delivery
    newshop.imageurl = req.body.imageurl
    shops = { "list": [...shops.list, newshop] }
    res.json(shops.list)
})

router.route('/shops/:shop_id')
.get((req, res) => {
    const shop_id = req.params.shop_id
    const id = shops.list.findIndex(item => +item.id === +shop_id)
    res.json(shops.list[id])
})
.put((req, res) => {
    const shop_id = req.params.shop_id
    const id = shops.list.findIndex(item => +item.id === +shop_id)
    shops.list[id].id = req.body.id
    shops.list[id].name = req.body.name
    shops.list[id].price = req.body.price
    shops.list[id].Deliverycost = req.body.Deliverycost
    shops.list[id].Delivery = req.body.Delivery
    shops.list[id].imageurl = req.body.imageurl
    res.json(shops.list)
})
.delete((req, res) => {
    const shop_id = req.params.shop_id
    shops.list = shops.list.filter(item => +item.id !== +shop_id)
    res.json(shops.list)
})



router.route('/income')
.get((req, res) => res.json(income))



router.route('/purchase/:shop_id')
.delete((req, res) => {
    const shop_id = req.params.shop_id
    const id = shops.list.findIndex(item => +item.id === +shop_id)
    console.log('shopID: ', shop_id, 'ID: ', id)
    if (id !== -1) {
        income += shops.list[id].price
        shops.list = shops.list.filter(item => +item.id !== +shop_id)
        res.json(shops.list)
    }
    else {
        res.send('Not found')

    }
})

router.post('/register',
async (req, res) => {
    try {
        const SALT_ROUND = 10
        const { username, email, password } = req.body
        if (!username || !email || !password)
            return res.json({ message: "Cannot register with empty string" })
        if (db.checkExistingUser(username) !== db.NOT_FOUND)
            return res.json({ message: "Duplicated user" })

        let id = (users.users.length) ? users.users[users.users.length - 1].id + 1 : 1
        hash = await bcrypt.hash(password, SALT_ROUND)
        users.users.push({ id, username, password: hash, email })
        res.status(200).json({ message: "Register success" })
    } catch {
        res.status(422).json({ message: "Cannot register" })
    }
})

router.get('/alluser', (req, res) => res.json(db.users.users))

router.get('/', (req, res, next) => {
res.send('Respond without authentication');
});

// Error Handler
app.use((err, req, res, next) => {
let statusCode = err.status || 500
res.status(statusCode);
res.json({
    error: {
        status: statusCode,
        message: err.message,
    }
});
});

// Start Server
app.listen(port, () => console.log(`Server is running on port ${port}`))

