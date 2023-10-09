const express = require('express');
const bcrypt = require('bcryptjs');
const cors = require('cors');
const knex = require('knex')({
        client: 'pg',
        connection: {
            connectionString : process.env.DATABASE_URL,
            ssl: {rejectUnauthorized: false},
            port : 5432,
            host: process.env.DATABASE_HOST,
            user: process.env.DATABASE_USER,
            password: process.env.DATABASE_PW,
            database: proces.env.DATABASE_DB
    }
});
const register = require('./controllers/register.js');
const signin = require('./controllers/signin.js');
const profile = require('./controllers/profile.js');
const image = require('./controllers/image.js')



const app = express();

app.use(express.json())
app.use(cors())

app.all('/', (req, res) => {
    res.send(knex('users'))
})

app.post('/signin', (req, res) => { signin.handleSignin(req, res, knex, bcrypt)})
app.post('/register', (req, res) => {register.handleRegister(req, res, knex, bcrypt)})
app.get('/profile/:id', (req, res) => {profile.getProfile(req, res, knex)})
app.put('/image', (req, res) => {image.getImage(req, res, knex)})
app.post('/imageurl', (req, res) => {image.handleAPIcall(req, res)})


app.listen(process.env.PORT || 3000, () => {
    console.log(`app is running on port ${process.env.PORT || 3000}`)
})