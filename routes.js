const express = require('express');
const User = require('./models/user');
const path = require('path');
const formidable = require('formidable');
const async= require('async')

var jsDepdendencies = require('./routes/jsServer.js');
const { now } = require('mongoose');
const { use } = require('passport');

var router = express.Router();

router.use("/js", jsDepdendencies);

router.get("/", function (req, res) {
    res.status(200);
    res.contentType("text/html");
    res.sendFile(path.join(__dirname, "index.html"));
});

router.get("/users", function (req, res) {
    User.find()
        .sort({ createdAt: "descending" })
        .exec(function (err, users) {
            if (err) { next(err) }
            res.status(200);
            res.json(users);
        });

});

router.get("/user/:username", function (req, res) {
    User.findOne({ username: req.params.username })
        .exec(function (err, user) {
            if (err) { next(err) }
            res.status(200);
            res.json(user);
        });
});

router.get("/visits", function (req, res) {
    var sess = req.session;

    res.status(200);
    if (sess.visits) {
        sess.visits += 1;
        res.json({ visits: sess.visits });
    }
    else {
        sess.visits = 1;
        res.json({});
    }
});

router.post("/newUser", function (req, res, next) {
    form = formidable({ multiples: true });

    async.waterfall(
        [
        function(cb){
            form.parse(req, cb);
        }
        ,
        function(fields, files, cb){
            User.findOne({ username: fields.username }, function(err, user){
                if(err){
                    cb(err);
                }
                if(user){
                    cb(new Error("found user"), user)
                }
                else{
                    cb(err, fields)
                }
            });
        }
        ]
    , function(err, result){
        if(err){
            if(err.message==="found user"){
                return res.sendStatus(500);
            }
            else{
                console.log("error parsing/saving signup data");
                return res.sendStatus(404);
            }
        }
            var newuser=new User({
                username: result.username,
                password: result.password
            });
            newuser.save();
            console.log(newuser)
            return res.sendStatus(200);
    });

/*
    form.parse(req, function (err, fields, files) {
        if (err) {
            next(err);
            return;
        }

        var checkUser = {}
        return (
        User.findOne({ username: fields.username }, function (err, user) {
            if (err) {
                next(err);
            }
            console.log(user);
            if (user) {
                return res.sendStatus(404);
                console.log("found user");
            }
            if (null) {
                console.log("returned true");
            }
            console.log(" didnt find user");

            var newuser=new User({
                username: fields.username,
                password: fields.password
            });
            //newuser.save(next);
            //res.sendStatus(200);
        }));
    });*/
});

router.post("/login", function(req, res){
    var sess= req.session;
    form = formidable({ multiples: true });
    
    async.waterfall(
        [
        function(cb){
            form.parse(req, cb);
        }
        ,
        function(fields, files, cb){
            User.findOne({ username: fields.username }, function(err, user){
                if(err){
                    cb(err);
                }
                if(user){
                    if(user.password===fields.password){
                        cb(null, user);
                    }
                    else{
                        cb(new Error("wrong password"))

                    }
                }
            });
        }
        ]
    , function(err, result){
        if(err){
            return res.sendStatus(500);
        }
        console.log(result);
        sess.username= result.username;
        return res.sendStatus(200);

    });
});

router.get("/session", function(req, res){
    sess=req.session;
    res.status(200);
    res.json({username: sess.username});
});

module.exports = router;