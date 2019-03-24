const postModels = require('../models/post');
const userModels = require('../models/user');
const fs = require('fs');
const bcrypt = require('bcrypt');
// const saltRounds = 10;
// const Ajv = require('ajv');
// const mongoose = require('mongoose');
// const memberValidate = require('../scheme/user');
var jwt = require('jsonwebtoken');
// const userSchema = require('../scheme/user.json');
// require('dotenv').config()

exports.userCreate = function(req, res, next){
    userModels.create(req.body)
    .then(function(){
        res.json({
            success: true,
            message: "New User Account is created"
        })
    })
    .catch(function(err){
        res.status(500).json({
            success: false,
            message: err.message || "Problem in create user account"
        })
    })
}

exports.userUpdate = function(req, res){
    userModels.findByIdAndUpdate(req.body.id, {
        username: req.body.username,
        password: req.body.password,
        email: req.body.email,
        image: req.file ? req.file.filename : null
    })
    .then(function(){
        res.json({
            success: true,
            message: "User Data is updated succesfully"
        })
    })
    .catch(function(err){
        res.status(500).json({
            success: false,
            message: "User Data update is failed"
        })
    })
}


exports.userFindAll = function(req, res){
    userModels.find()
    .then(function(user){
        res.status(200).json({
            success: true,
            user: user
        })
    })
    .catch(function(err){
        res.status(500).json({
            success: false,
            message: err.message || "Internal Error"
        })
    })
}

exports.userDelete = function(req, res){
    userModels.findOneAndDelete({ '_id': req.body.id})
    .then(function(){
        fs.unlink('')
        res.json({
            success: true,
            message: "User Data is deleted succesfully"
        })
    })
    .catch(function(err){
        res.status(500).json({
            success: false,
            message: err.message || "Delete process is failed"
        })
    })
}

// exports.userCreate = function(req, res, next){
//     let user = new User(
//         {
//             username : req.body.username,
//             email : req.body.email,
//             password : req.body.password
//         });

//         var ajv = new Ajv();
//         const valid = ajv.validate(userSchema, user);

//         if (valid){
//             bcrypt.hash(user.password, saltRounds) .then(function(hash){
//                 user.password = hash
//                 user.save()
//                 .then(function() {
//                     res.status(200).json({
//                         message : 'Succes',
//                         body: user,
//                     })
//                 })
//                 .catch((err) => {
//                     res.send({ message : 'Error', error : err});
//                 });
//             });
//         } else{
//             res.status(400)
//             res.send({ message : 'Data Invalid', error : validate.errors});

//         }

// }


exports.Test = function(req, res, next){
    res.json({message : "connection succes"});
    next();
}



exports.userLogin = (req, res) => {
    userModels.findOne({ username: req.body.username }, (err, userNote) => {
     if (err) {
      return res.status(400).json({
       success: false,
       message: 'error'
      })
   
     } else {
      if (!userNote) {
       return res.status(400).json({
        message: 'User not found'
       })
      }
   
      bcrypt.compare(req.body.password, userNote.password)
       .then((valid) => {
        if (!valid) {
         return res.status(400).json({
          success: false,
          message: 'Wrong Password'
         })
        }
   
        const token = jwt.sign({ id: userNote._id }, 'jwtsecret', { expiresIn: '30d' })
        return res.status(200).json({
         success: true,
         token : token
        })
       })
       .catch(err => {
        return res.status(400).json({
         success: false,
         message: 'Password required to login'
        })
       })
     }
    })
   }




