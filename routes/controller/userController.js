const jwt = require('jsonwebtoken')
const bcrypt = require ('bcryptjs')
const asyncHandler = require('express-async-handler')
const userData = require('../../model/userModel')
// .................................
const getMe = asyncHandler(
    async (req , res)=>{
       await  res.status(200).json({msg:"users data displayed me"})
        } 
)
// .................................

const loginUser =asyncHandler(
async(req,res)=>{ 
    await res.status(200).json({msg:"user logged in "})
}
)
// .................................
const registerUser = asyncHandler(
    async (req, res) => {
        // for valid req
        const { name, email, password } = req.body
        if (!name || !email || !password) {
            res.status(400)
            throw new Error('plz fill all fields ')
        }
        // user exsistance checker
        const userExsist = userData.findOne({email});
        if (userExsist) {
            res.status(404)
            throw new Error('this user already exsist')
        }
        // convert pwd into hashed form using bcrypt
        // gen salt builtin bcrypt method
        const salt = await bcrypt.genSalt(10)
        const hashedPwd = await bcrypt.hash(password, salt)
        // create user
        const user = userData.create({
            name,
            email,
            password: hashedPwd
        })
        // checking data is valid
        if (user) {
            res.status(201).json({
                _id: user.id,
                name: user.name,
                email: user.email
            })
        } else {
            res.status(400)
            throw new Error('invalid user data')
        }

    }
)
// .................................
module.exports = { getMe,loginUser,registerUser};