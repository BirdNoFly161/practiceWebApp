const express= require('express');
const User= require('./models/user');
const path= require('path');
const formidable= require('formidable');

var jsDepdendencies= require('./routes/jsServer.js');
const { now } = require('mongoose');

var router= express.Router();

router.use("/js", jsDepdendencies);

router.get("/", function(req, res){
    res.status(200);
    res.contentType("text/html");
    res.sendFile(path.join(__dirname, "index.html"));
});

router.get("/users", function(req, res){
    User.find()
    .sort({createdAt : "descending"})
    .exec(function(err, users){
        if(err){ next(err) }
        res.status(200);
        res.json(users);
    });
    
});

router.get("/user/:username", function(req, res){
    User.findOne({username: req.params.username})
    .exec(function(err, user){
        if(err){ next(err) }
        res.status(200);
        res.json(user);
    });
});

router.get("/visits", function(req, res){
    var sess= req.session;
    
    res.status(200);
    if(sess.visits){
        sess.visits+=1;
        res.json({visits: sess.visits});
    }
    else{
        sess.visits=1;
        res.json({});
    }
});

router.post("/newUser", function(req, res, next){
    form= formidable({multiples: true});
    
    form.parse(req, function(err, fields, files){
        if(err){
            next(err);
            return;
        }
        
        var checkUser={}
        User.findOne({username: fields.username}, function(err, user){
            if(err){
                next(err);
            }
            if(user){
                console.log("nested");  

                console.log(user);  
                console.log(" found user ");  
                return res.sendStatus(404);
            }
        });
        var user=new User({
            username: fields.username,
            password: fields.password
        });

        user.save(next);
        console.log("outside");
        //res.sendStatus(200);

    });
});

module.exports= router;