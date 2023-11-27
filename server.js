    const express = require('express')
    const dotenv = require('dotenv').config()
    const port =process.env.PORT || 6500
    const app = express()
    const {errorHandler} = require('./routes/controller/middleware/errorMiddleware')
    const connectDb= require('./config/db')
    const goals = require('./routes/goalsRouter')
    const users = require('./routes/userRoutes')

connectDb()

//  ....................MIDDLEWARES...................................
 app.use(express.json())
 app.use(express.urlencoded({extended:true}))
 app.use(errorHandler)
app.use('/api/goals',goals)
app.use('/api/user',users)


//  ..................................................................

const start = ()=>{
    try{
        app.listen(port,()=>{
            console.log(`server started on localhost:${port}`)
        })
    }catch(err){
        console.log(err)
    }
}
start()
 


