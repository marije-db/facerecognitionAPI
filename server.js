const express = require('express');
const bcrypt = require('bcryptjs');
const cors = require('cors');
const knex = require('knex')({
        client: 'pg',
        connection: {
            host : '127.0.0.1',
            port : 5432,
            user : 'postgres',
            password : 'marijedevDB',
            database : 'face-recognition'
    }
});
const register = require('./controllers/register');
const signin = require('./controllers/signin');
const profile = require('./controllers/profile');
const image = require('./controllers/image');



const app = express();

app.use(express.json())
app.use(cors())

app.get('/', (req, res) => {
    res.send(knex('users'))
})

app.post('/signin', (req, res) => { signin.handleSignin(req, res, knex, bcrypt)})
app.post('/register', (req, res) => {register.handleRegister(req, res, knex, bcrypt)})
app.get('/profile/:id', (req, res) => {profile.getProfile(req, res, knex)})
app.put('/image', (req, res) => {image.getImage(req, res, knex)})
app.post('/imageurl', (req, res) => {image.handleAPIcall(req, res)})


app.listen(process.env.PORT || 3000, () => {
    console.log(`app is running on port ${process.env.PORT}`)
})