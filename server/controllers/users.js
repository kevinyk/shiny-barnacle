var mongoose = require('mongoose');
var User = mongoose.model('User');
var bcrypt = require('bcrypt');
module.exports = {
    create: function(req,res){
         // Registering people:
        // 1. Validate post information
        // 2. Hash password with bcrypt
        // 3. Save the user
        console.log(req.body);
        if (req.body.password != req.body.passwordConfirmation) {
            res.json({ errors: "YOU DUMMY" });
        } else {
            var newUser = new User(req.body);
            newUser.save(function (err) {
                if (err) {
                    console.log('validation errors');
                    res.json(err);
                } else {
                    console.log('made new user');
                    res.json(newUser);
                }
            })
        }
    },
    login: function (req, res) {
        // 1. Check the db for a user with the entered email
        // 2. Hash the password and compare
        // 3. 
        User.findOne({ email: req.body.email }, function (err, foundUser) {
            if (err) {
                console.log('validation errors');
                res.json(err);
            } else if (foundUser == null) {
                console.log('no user found');
                res.json({ errors: { name: { message: "You are invalid" } } });
            } else {
                console.log('user found');
                bcrypt.compare(req.body.password, foundUser.password).then(function (results) {
                    if (results === true) {
                        req.session.userId = foundUser._id;
                        res.json(foundUser);
                    } else {
                        res.json({ errors: { name: { message: "You are invalid" } } });
                    }
                });
            }
        })
    },
    getCurrent: function(req,res){
         // 1. Check if req.session.userId even exists
        // 2. If it does, then query the db for that user
        // 3. send that user back
        if (req.session.userId != undefined) {
            User.findOne({ _id: req.session.userId }, function (err, foundUser) {
                if (err) {
                    res.json(err);
                } else {
                    res.json(foundUser);
                }
            })
        } else {
            res.json({ errors: "no user found" });
        }
    }
}