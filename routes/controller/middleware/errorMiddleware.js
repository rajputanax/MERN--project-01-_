const errorHandler = (err,req,res,next)=>{
    console.log('middleware accessed')
const statusCode = res.statusCode ? res.statusCode:500
res.status(statusCode)

res.json({message : err.message ,

})
next()

}

module.exports={errorHandler}