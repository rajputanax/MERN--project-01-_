const mongoose = require('mongoose')

const userData = mongoose.Schema({
    name: {
        type :String,
        required :[true , 'plz add a name']
    },
  email: {
        type :String,
        required :[true , 'plz add an email'],
        unique:true 
    },
  password: {
        type :String,
        required :[true , 'plz add a password']
    },
   
},{timestamps:true});


module.exports= mongoose.model('userModel' , userData)
