const Users = require('../Mongoose/Users')

const postUser =async (req,res,next)=>{
    const {name, password} = req.body
    
    const existedUser =  await Users.findOne({name:name})

    if (!existedUser) {
    const createdUser = new Users({
        name,
        password
    })
    try{
    await createdUser.save()
    res.status(201).json({createdUser:createdUser.toObject({getters:true})})
    }
    
        catch(err){
            const error = new Error('There is a problem in creating user')
            error.code = 500
            return next(error)
        
        }
    }
    else{
        const error = new Error("That user name already exists why don't you login instead")
            error.code = 500
            return next(error)
    }

}

const getUser = async (req,res,next)=>{
    const {name, password} = req.body
    
    const existedUser =  await Users.findOne({name:name})

    if(existedUser){
        const isValid= password === existedUser.password
        if(isValid){
            res.status(200).json({existedUser:existedUser.toObject({getters:true})})
        }
        else{
            const error = new Error("Your password is wrong why don't you login again")
            error.code = 500
            return next(error)
        }

    }
    else{
        const error = new Error("That user name doesn't exist")
        error.code = 500
        return next(error)
    }
}

const checkUser =async(req,res,next)=>{
    const userId = req.params.uid
    const existedUser = await Users.findById(userId)
    if(existedUser){
            res.status(200).json({existedUser:existedUser.toObject({getters:true})})

    }
    else{
        const error = new Error("This user doesn't exist")
        error.code = 500
        return next(error)
    }

}

exports.postUser = postUser
exports.getUser = getUser
exports.checkUser = checkUser