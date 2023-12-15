const jwt = require('jsonwebtoken');
const asyncHandler = require('express-async-handler');
const user = require('../../../model/userModel');
require('dotenv').config(process.env.JWT_SECRET);
const JWT_SECRET = process.env.JWT_SECRET;
//...................................................
const protect = asyncHandler(
  async (req, res, next) => {
    let token
    
    if (req.headers.authorization && 
      req.headers.authorization.startsWith('Bearer')
      ){
      try {

        token = req.headers.authorization.split(' ')[1]
        const decoded = jwt.verify(token, JWT_SECRET); // Replace 'your-secret-key' with your actual secret key

        // Attach the user data to the request object for later use
        req.user = await user.findById(decoded.id);

        next();
      }
      
      catch (err) {
        console.error(err)
        res.status(400)
        throw new Error('not authorized')
      }
    }
    if(!token){
      res.status(400)
      throw new Error('no token')
    }
  }
);
// bearer tokken
//....................................................
module.exports = { protect }
