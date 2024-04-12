const express = require('express');
const bcrypt = require('bcrypt');
const cors = require('cors');
const knex = require('knex');
const saltRounds = 10;

const register = require('./register');
const profile = require('./profile');
const image = require('./image');
const signin = require('./signin');

const db = knex({
    client: 'pg',
    connection: {
      host : '127.0.0.1',
      port : 5432,
      user : 'postgres',
      password : 'pratham',
      database : 'pratham'
    }
});


db.select('*').from('users').then(data => console.log(data))

const app = express();

app.use(express.json());
app.use(cors())

app.get('/',(req,res)=>{
    res.json(database.user)
})

app.post('/signin', (req,res) => { signin.handlesignin(req,res,db,bcrypt)})

app.post('/register', (req,res) => { register.handleregister(req,res,bcrypt,db,saltRounds)})

app.get('/profile/:id' ,(req,res) => { profile.handleprofile(req,res,db) })

app.put('/image', (req,res) => { image.handleimage(req,res,db)})

app.post('/imageurl', (req,res) => { image.handleApicall(req,res,db)})

app.listen(3001,()=>{
    console.log('app is working at port 3001');
});