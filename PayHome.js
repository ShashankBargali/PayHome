const express = require("express");
const mongoose = require("mongoose");
const User = require('./js/users');
const Digi = require('./js/debits');
const app = express();
const path = require('path');
const boydparser = require('body-parser');
const debits = require("./js/debits");
const port = process.env.port || 80
let aname = null, aage = null, aacno = null, apass = null, apin = null, abal = Number, adigi = null;
const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789.,/<>!@#$%^&*()_-+={[]}\\|`~';
// const DB = 'mongodb+srv://Banking_Family:ZkSAk2COjQ7t2v6D@cluster0.rkqye.mongodb.net/Digital_Banking?retryWrites=true&w=majority'

// mongoose.connect(DB, {
//     useNewUrlParser: true
// }).then(()=>{
//     console.log("I got u man")
// })

// Some Important Functions
mongoose.connect('mongodb+srv://shashankbb:shashank2021@cluster0.m5okb.mongodb.net/Digital_Banking?retryWrites=true&w=majority', { useNewUrlParser: true }).then(() => {
    console.log("I got u man")
});
function generateString(length) {
    let result = ' ';
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }

    return result;
}

app.use("/static", express.static('static'));
app.use(express.urlencoded());


app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

app.get('/', (req, res) => {
    res.status(200).render("Home.pug");
})
app.get('/Create', (req, res) => {
    res.status(200).render('Create.pug')
})
app.get('/LogIn', (req, res) => {
    res.status(200).render('login.pug')
})
app.get('/instruct', (req, res) => {
    res.render('instruct.pug');
})

// User api's

app.get('/log/account', (req, res) => {
    res.render('testing', { 'name': aname, 'bal': abal, "account": aname });
})
app.get('/log/account/statements', (req, res) => {
    res.render('statements', { 'bal': abal, "account": aname })
})
app.get('/log/account/cards', (req, res) => {
    res.render('cards', { "account": aname })
})
app.get('/log/account/statements/withdraw', (req, res) => {
    res.render("statements/withdraw", {
        'bal': abal
    });
})
app.get('/log/account/statements/addbal', (req, res) => {
    res.render("statements/addbal");
})
app.get('/log/account/statements/transfer', (req, res) => {
    res.render("statements/transfer", {
        'bal': abal
    })
})
app.get('/log/account/cards/get', (req, res)=>{
    if(adigi == false){
        res.render('getNow')
    }
    else{
        res.render('statements/notification', {
            'action': "Digi Pay create account",
            'msg': "You already have your Digi Pay Account!\nThank you for trying",
            "image": '/static/images/icon-thumbs-up.svg'
        })
    }
})

app.post('/register', (req, res) => {
    const users = new User({
        name: req.body.name,
        age: req.body.age,
        acno: req.body.acno,
        password: req.body.psd,
        pin: req.body.pin
    });
    users.save().then(() => {
        res.status(200).render("Loader.pug", {
            'msg': "Your Account have been created successfully",
            'anchor': `LogIn`,
            'tag': '/LogIn',
            'anchor2': 'Back',
            'tag2': '/'
        })
    }).catch((err) => {
        throw err;
    })
})
app.post('/log', (req, res) => {
    User.findOne({ acno: req.body.acno }).then((data) => {
        aname = null, aage = null, aacno = null, apass = null, apin = null
        let pass = req.body.psd
        if (data.password === pass) {
            aname = data.name;
            aage = data.age;
            aacno = data.acno;
            apass = data.password;
            apin = data.pin;
            abal = data.balance;
            adigi = data.digipay;
            res.status(200).render('Loader.pug', { 'msg': "Logged in successfully", 'anchor': `get In`, 'tag': '/log/account' })
        }
        else {

            res.render('Loader.pug', {
                'msg': "Sorry You entered wrong Account Number or password",
                'anchor': `Back to Home`,
                'tag': '/',
                'anchor2': 'Try Again',
                'tag2': '/LogIn'
            })
        }
    }).catch(() => {
        res.render('Loader.pug', {
            'msg': "Sorry You entered wrong Account Number or password",
            'anchor': `Back to Home`,
            'tag': '/',
            'anchor2': 'Try Again',
            'tag2': '/LogIn'
        })
    })
})
app.post('/log/account/statements/addbal', (req, res) => {
    if (apin == req.body.pin) {
        // res.send("Ok")
        for (let index = 1; index <= req.body.amount; index++) {
            abal++;
        }
        User.updateOne({ acno: aacno }, {
            $set: {
                balance: abal
            }
        }).then(() => {
            res.render('statements/notification', {
                "action": "Add Balance",
                "msg": "Added successfully",
                "image": '/static/images/icon-thumbs-up.svg'
            })
        })
    }
    else {
        res.render("statements/notification", {
            "action": "Add Balance",
            "msg": "The pin you Entered was incorrect",
            "image": '/static/images/icon-sad.png'
        })
    }
})
app.post('/log/account/statements/withdraw', (req, res) => {
    if (apin == req.body.pin) {

        abal -= req.body.amount
        User.updateOne({ acno: aacno }, {
            $set: {
                balance: abal
            }
        }).then(() => {
            res.render('statements/notification', {
                "action": "Withdraw amount",
                "msg": "Amount have deducted from your bank account",
                "image": '/static/images/icon-thumbs-up.svg'
            })
        })
    }
    else {
        res.render("statements/notification", {
            "action": "Add Balance",
            "msg": "The pin you Entered was incorrect",
            "image": '/static/images/icon-sad.png'
        })
    }

})
app.post('/log/account/statements/transfer', (req, res) => {
    if (apin == req.body.pin) {
        abal -= req.body.amount;
        let bala;
        User.updateOne({ acno: aacno }, {
            $set: {
                balance: abal
            }
        }).then(() => {
            User.findOne({ name: req.body.name }).then((data) => {
                bala = data.balance;
                for (let i = 0; i < req.body.amount; i++)
                    bala++;
                User.updateOne({ name: req.body.name }, {
                    $set: {
                        balance: bala
                    }
                }).then(() => {
                    res.render("statements/notification", {
                        "action": "Transfer",
                        "msg": "The transfer have been successfully done",
                        "image": '/static/images/icon-thumbs-up.svg'
                    })
                })
            }).catch(() => {
                res.render("statements/notification", {
                    "action": "Transfer",
                    "msg": "The name you entered can't be found",
                    "image": '/static/images/icon-sad.png'
                })
            })
        })
    }
    else {
        res.render("statements/notification", {
            "action": "Add Balance",
            "msg": "The pin you Entered was incorrect",
            "image": '/static/images/icon-sad.png'
        })
    }
})
app.post('/log/account/cards/get', (req,res)=>{
    if(abal >= 3){
        abal -= 3;
        adigi = true;
        User.updateOne({acno: aacno}, {
            $set:{
                balance: abal,
                digipay: adigi
            }
        }).then(()=>{
            console.log('yess')
        })
        const debits = new Digi({
            Name: aname,
            Age: aage,
            acno: aacno,
            Password: apass,
            Balannce: abal,
            mPin: apin,
            qrCoded: generateString(20)
        })
        debits.save().then(()=>{
            res.render('statements/notification', {
                "image": '/static/images/icon-thumbs-up.svg',
                'action': 'Digi Pay create account',
                'msg': "You have successfully created your account in Digi Pay <br> Go and login"
            })
        })
    }
    else {
        res.render('statements/notification', {
            "image": '/static/images/icon-sad.png',
            'action': 'Digi Pay create account',
            'msg': "The Balance is not sufficient to create account"
        })
    }
})


app.listen(port, () => {
    console.log("Server started at port : ", port)
})