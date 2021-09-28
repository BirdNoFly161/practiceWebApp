const express= require('express');
const mongoose= require('mongoose');
const path= require('path');
const bodyParser= require('body-parser');
const session= require('express-session');
const flash= require('connect-flash');
const MongoDBStore= require('connect-mongodb-session')(session);

var routes= require('./routes');

var app= express();

mongoose.connect("mongodb://localhost:27017/test");

var store= MongoDBStore({
    uri: "mongodb://localhost:27017/sessions",
    collection: "testSessions"

});

app.use(function(req, res, next){
    console.log(req.url);
    next();
});
app.use(bodyParser.urlencoded({extended: false}));
app.use(session({
    secret: "RDl+1JiuB+1EwY5n+vvF1w==",
    store: store,
    resave: false,
    saveUninitialized: true
}));
app.use(flash());

app.use(routes);

app.listen(3000, function(){
    console.log("express app listening on port 3000");
});