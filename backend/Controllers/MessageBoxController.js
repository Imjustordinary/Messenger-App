const MessageBox = require('../Mongoose/MessageBox')
const Users = require('../Mongoose/Users')
const Messenger = require('../Mongoose/Messenger')
const mongoose = require('mongoose')

const postMessageBox = async (req,res,next)=>{
const userId = req.params.uid
const {messengerId, name, message} = req.body
try {
    await Users.findById(userId)
} catch (err) {
    const error = new Error('There is no users in messenger')
    error.code = 500
    return next(error)
}

let messager 
try {
    messager = await Messenger.findById(messengerId)
} catch (err) {
    const error = new Error('There is no messenger')
    error.code = 500
    return next(error)
}


const createdMessageBox = new MessageBox({
    userid:userId,
    name,
    message
})
try{
    const sess = await mongoose.startSession();
    sess.startTransaction()
    await createdMessageBox.save({session:sess})
    await messager.messageboxes.push(createdMessageBox)
    await messager.save({session:sess})
    await sess.commitTransaction()
    // const allMessages = await MessageBox.find()
    res.status(201).json({message:createdMessageBox.toObject({getters:true})})
}
catch(err){
    const error = new Error('There is an error in sending message')
    error.code = 500
    return next(error)
}
}

const getMessageBox =async (req,res,next)=>{
const allMessages = await MessageBox.find()
res.status(200).json({message:allMessages.map(each=>each.toObject({getters:true}))})
}

exports.postMessageBox = postMessageBox
exports.getMessageBox = getMessageBox