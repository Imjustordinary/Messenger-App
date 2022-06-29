const mongoose = require('mongoose')

const messagersSchema =  new mongoose.Schema({
    name:{type:String, required:true}, 
    
    messageboxes:[{type:mongoose.Types.ObjectId, required:true,ref:'Messagebox'}]
})
module.exports = mongoose.model('Message', messagersSchema)