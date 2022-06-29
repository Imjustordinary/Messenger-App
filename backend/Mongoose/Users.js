const mongoose = require('mongoose')

const usersSchema =  new mongoose.Schema({
    name:{type:String, required:true}, 
    password:{type:String, required:true, minlength:6}
})
module.exports = mongoose.model('User', usersSchema)