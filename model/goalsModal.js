const mongoose = require('mongoose');

const goalSchema =new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:'userData'
    },
    text:{
        type:String,
        require:true
    },
   
}
,{
    timestamps:true
})

module.exports= mongoose.model('goalsModal',goalSchema)