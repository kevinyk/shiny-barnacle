var mongoose = require('mongoose');
var bcrypt = require('bcrypt');
var UserSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    name: { type: String, required: true, minlength: 5 },
    password: { type: String, required: true, minlength: 5 }
}, { timestamps: true });
// In order to hash passwords between save/validate, we create a pre save hook
UserSchema.pre('save', function (next) {
    console.log('pre save hook');
    console.log(this);
    var self = this;
    bcrypt.hash(self.password, 10).then(function (hash) {
        console.log(self);
        console.log('hash', hash);
        self.password = hash;
        next();
    });
});

mongoose.model('User', UserSchema);