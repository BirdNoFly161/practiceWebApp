const mongoose= require('mongoose');
const bcrypt= require('bcrypt-nodejs');

const   SALT_FACTOR=10;
const { Schema }= mongoose;

var noop= function(){};
const userSchema= new Schema({
    username: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    createdAt: {type: Date, default: Date.now},
    displayName: String,
    bio: String
});

userSchema.methods.name= function(){
    return (this.displayName || this.username);
}

userSchema.method.checkPassword= function(guess, done){
    bcrypt.compare(guess, this.password, function(err, isMatch){
        done(err, isMatch);
    });
}

userSchema.pre("save", function(done){
    var user=this;
    if(!user.isModified("password")){
        return done();
    }

    bcrypt.genSalt(SALT_FACTOR, function(err, salt){
        if(err){
            return done(err);
        }

        bcrypt.hash(user.password, salt, noop, function(err, hashedPassword){
            if(err){
                return done(err);
            }

            user.password= hashedPassword;
            done();
        });
    });
});

var User=mongoose.model("User", userSchema);
module.exports= User;