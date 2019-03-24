const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const postSchema = new Schema ({
    dataTitle : { 
        type : [String, "Only string is allowed!"], 
        required : [true, "Can't be blank!"], 
        maxlength: [100, "Maximum character is 100"]},

    dataContent : { 
        type : [String, "Only string is allowed!"],
        required : [true, "Can't be blank!"]},

    dataWriter : { 
        type : [String, "Only string is allowed!"], 
        required : [true, "Can't be blank!"], 
        maxlength: [100, "Maximum character is 100"]},

    image : { 
        type : [String, "Only string is alowed!"], 
        required : [false, "Can be blank!"]}

})

module.exports = mongoose.model('Posting', postSchema);