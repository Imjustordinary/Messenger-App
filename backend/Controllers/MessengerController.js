const Messenger = require('../Mongoose/Messenger')

const postMessenger =async (req,res,next)=>{
    const {name} = req.body
    const createdMessenger = new Messenger({
        name,
        messageboxes:[],
    })
    try{
        await createdMessenger.save()
        res.status(201).json({createdMessenger:createdMessenger.toObject({getters:true})})
        }
        
            catch(err){
                const error = new Error('There is a problem in creating messenger')
                error.code = 500
                return next(error)
            
            }
}
exports.postMessenger = postMessenger