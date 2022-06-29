const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')

const app = express()
const userRoute = require('./Routes/Users')
const MessengerRoute = require('./Routes/Messenger')
const MessageBoxRoute = require('./Routes/MessageBox')
const url = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.ewrso.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`

app.use(bodyParser.json())
app.use((req,res,next)=>{
    res.setHeader('Access-Control-Allow-Origin','*')
    res.setHeader(
        'Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept, Authorization'
    )
    res.setHeader('Access-Control-Allow-Methods','GET, POST, PATCH, DELETE')
    next()
})
app.use('/',userRoute)
app.use('/',MessengerRoute)
app.use('/',MessageBoxRoute)

app.use((req,res,next)=>{
    const error = new Error('This page is not found')
        error.code = 404
    throw error
})

app.use((error,req,res,next)=>{
    if(res.headersSent){
        return next(error)
    }
    res.status(error.code||500).json({message:error.message}||'Unknown error')
})

mongoose.connect(url, {useNewUrlParser: true, useUnifiedTopology: true,useCreateIndex:true}).then(
    app.listen(process.env.PORT||5000)
).catch(error=>
    console.log(error)
    )
