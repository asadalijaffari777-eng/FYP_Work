const express = require('express');
const path = require('path');
const bcrypt = require('bcrypt');
const collection = require('./config');

const app = express();

// //Converting the data into the json format
app.use(express.urlencoded({extended: false}));

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '../views'));

// //static file: for browser to know about css and js
app.use(express.static('updated'));
app.use(express.static(path.join(__dirname, '../css')));
app.use(express.static(path.join(__dirname, '../js')));
app.use(express.static(path.join(__dirname, '../images')));



// //to render login page
app.get('/', (req, res)=>{
    res.render('login')
});

// //to render home page
app.get('/index', (req, res) => {
    res.render('index');
});


// //to render register page
app.get('/register', (req, res)=>{
    res.render('register')
});


// //to render start_Business page
app.get('/start-business', (req, res)=>{
    res.render('start-business')
});


// //to render manufacturer page
app.get('/manufacturer', (req, res)=>{
    res.render('manufacturer')
});


// //to render contact page
app.get('/contact', (req, res)=>{
    res.render('contact')
});


// //to render about page
app.get('/about', (req, res)=>{
    res.render('about')
});


// //to render start_Business page
app.get('/start-business', (req, res)=>{
    res.render('start-business')
});

//Register users
app.post('/register', async (req, res)=>{
    const data = {
        // the class name of input used for email in register file
        name: req.body.registerName,
        email: req.body.registerEmail,
        password: req.body.registerPassword
    }

    //check if the users name is already used
    const existUser = await collection.findOne({email: data.email});
    if(existUser){
        res.send('User email is already used! Please enter a different email')
    }else{
        //hash the password using bcrypt
        const saltRound = 10;
        const hashPass = await bcrypt.hash(data.password, saltRound);

        //replace the original pass with the hash one!
        data.password = hashPass;
        const userdata = await collection.insertMany(data);
        res.render('index');
        console.log(userdata);
    }
})

//user login
app.post('/login', async (req, res)=>{
    try{
        const check = await collection.findOne({email: req.body.loginEmail});
        if (!check) {
        // user not found
        return res.render("login", { popup: { title: "User not found", message: "Please register your account." } });
        }

        const isPassMatch = await bcrypt.compare(req.body.loginPassword, check.password);
        if(!isPassMatch){
        return res.render("login", { popup: { title: "Wrong Password", message: "The password you entered is incorrect." } });
        }else{
            res.render('index');
        }
    }catch(err){
         res.render('login', { error: 'Something went wrong!' });
    }
})

app.listen(3001, ()=>{
    console.log('app is listening');
})
