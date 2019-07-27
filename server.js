const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');

app.use(cookieParser());

app.get('/', function(req,res) {
    const userId = req.cookies.user_id
    if (userId) {
        res.send ("hello " + userId + ". you are logged in, and will stay logged in until you <a href='/logout'>LOGOUT</a>")
    } else {
        res.send ("you are not logged in. <a href='/signup'>SIGN UP</a>")
    }

})

app.get('/signup', function(req,res) {
    const userId = Math.floor(Math.random() * 900000) + 100000; //some random number
    res.cookie('user_id', userId, {expires: new Date(2020, 1, 1)});
    res.send("you are signed up with the user id: " + userId + ". go back <a href='/'>HOME</a>")
})

app.get('/logout', function (req, res) {
    res.clearCookie('user_id');
    res.redirect('/');
    res.end();
});

app.listen(8081, function(){
    console.log("server is running. go to http://localhost:8081");
});
