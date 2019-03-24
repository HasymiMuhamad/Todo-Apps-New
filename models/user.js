const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const uniqueValidator = require('mongoose-unique-validator');
const bcrypt = require('bcrypt');
const saltRounds = 10;


const userSchema = new Schema({
    username: {
        type: [String, "Only string is allowwed !"], 
        required: [true, "Can't be blank!"], 
        max: [100, "Maximum character is 100"],
        lowercase: [true, "All of user input be lowercase"],
        match: [/^[a-zA-Z0-9]+$/, 'is invalid'],
        index: true,
        unique: [true, "username is already exists"],
        uniqueCaseInsensitive: true,
        min: [3, "minimum character is 8"],
        max: [20, "maximum character is 20"]  
    },

    password: {
        type: [String, "Only string is allowed"], 
        required: [true, "Can't be blank"],
        min: [3, "Minimum character is 8"],
        max: [20, "Maximal character is 20"]
    },

    email: { 
        type: [String, "Only string is allowed"], 
        lowercase: [true, "user input coverted to lowercase"],
        required: [true, "Can't be blank"],
        match: [/\S+@\S+\.\S+/, 'is invalid'],
        index: true,
        unique: true,
        min: [3, "Minimum character is 3 character"],
        max: [20, "Maximum character is 20 character"]

    }
})

userSchema.pre('save', (next)=>{
    this.username = this.username.toLowerCase();
    this.password = bcrypt.hashSync(this.password, saltRounds)
    next()
})

userSchema.plugin(uniqueValidator)


module.exports = mongoose.model('User', userSchema);

