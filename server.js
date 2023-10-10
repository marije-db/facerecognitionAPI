import express, { json } from 'express';
import bcrypt from 'bcryptjs';
import cors from 'cors';
import knex from 'knex'

const db = knex({
        client: 'pg',
        connection: {
            connectionString : process.env.DATABASE_URL,
            ssl: {rejectUnauthorized: false},
            port : 5432,
            host: process.env.DATABASE_HOST,
            user: process.env.DATABASE_USER,
            password: process.env.DATABASE_PW,
            database: process.env.DATABASE_DB
    }
});
import { handleRegister } from './controllers/register.js';
import { handleSignin } from './controllers/signin.js';
import { getProfile } from './controllers/profile.js';
import { getImage, handleAPIcall } from './controllers/image.js';



const app = express();

app.use(json())
app.use(cors())

app.all('/', (req, res) => {
    res.send(db('users'))
})

app.post('/signin', (req, res) => { handleSignin(req, res, db, bcrypt)})
app.post('/register', (req, res) => {handleRegister(req, res, db, bcrypt)})
app.get('/profile/:id', (req, res) => {getProfile(req, res, db)})
app.put('/image', (req, res) => {getImage(req, res, db)})
app.post('/imageurl', (req, res) => {handleAPIcall(req, res)})


app.listen(process.env.PORT || 3000, () => {
    console.log(`app is running on port ${process.env.PORT || 3000}`)
})