const mongoose = require('mongoose')

const messageboxSchema =  new mongoose.Schema({
    userid:{type:mongoose.Types.ObjectId, required:true, ref:'User'}, 
    name:{type:String, required:true},
    message:{type:String, required:true}
})
module.exports = mongoose.model('Messagebox', messageboxSchema)