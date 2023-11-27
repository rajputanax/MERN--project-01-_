const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config(process.env.MONGODB_URI)
const url = process.env.MONGODB_URI;

const connectDB = async ()=>{
   try{
   const cable = await mongoose.connect(url,{
    useNewUrlParser:true,
    useUnifiedTopology:true
})
    console.log(`successfuly connects ${cable.connection.host}`)
}
catch(err){
console.error(`internal error : ${err}`)
process.exit(1) 
   }
}

connectDB()

module.exports = connectDB;