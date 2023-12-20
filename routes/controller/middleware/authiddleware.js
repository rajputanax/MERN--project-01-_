const jwt = require('jsonwebtoken ');
const asyncHandler = require('express-async-handler');
const user = require('../../../model/userModel'); 
//...................................................
const protect = asyncHandler(
    async( req , res , next) => {
     let tokken 
     if (req.header.authorization && req.header.authorization.startsWith('Bearer') )
     {
        try{
          tokken = req.header.authorization.split('')[1]
        }catch(err){

        }
       }
    }
);
// bearer tokken
//....................................................
module.exports={protect}
