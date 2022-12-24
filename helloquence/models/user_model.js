const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');

const UserModel = new mongoose.Schema({
    email: { type: String, required: true },
    password: { type: String, required: true}
})

// Handles hashing and salting of password fields
// Adds the following properties to the user object:
// -password
// -salt
// -hash
UserModel.plugin(passportLocalMongoose);

mongoose.exports=mongoose.model('User', UserModel);