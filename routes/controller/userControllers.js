const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const asyncHandler = require('express-async-handler')
const userData = require('../../model/userModel')
require('dotenv').config(process.env.JWT_SECRET);
const JWT_SECRET = process.env.JWT_SECRET;
// Now you can use JWT_SECRET in your code
 console.log(JWT_SECRET);
// .................................
//[private route]
const getMe = asyncHandler(
    async (req, res) => {
        await res.status(200).json({ msg: "users data displayed me" })
    }
)
// get token.....................
const generateToken = (id) => {
    return jwt.sign({ id }, JWT_SECRET, {
        expiresIn: '30d',
    });
};
// .................................//[public routes 👇]..............................................................
const registerUser = asyncHandler(
    async (req, res) => {
        // ...............................................for valid req

        const { name, email, password } = req.body
        // console.log(req.body)
        if (!name || !email || !password) {
            res.status(400)
            throw new Error('plz fill all fields ')
        }
        //.............................................. user exsistance checker

        const userExsist = await userData.findOne({ email });
        if (userExsist) {
            // console.log(userExsist)
            res.status(404)
            throw new Error('this user already exsist')
        }
        // .........convert pwd into hashed form using bcrypt gen salt builtin bcrypt method
    
        const salt = await bcrypt.genSalt(10)
        const hashedPwd = await bcrypt.hash(password, salt)
        // ...............................................create user
        const user = await userData.create({
            name,
            email,
            password: hashedPwd
        })
        //  console.log(user)
        // checking data is valid then show it or 
        if (user) {
            res.status(201).json({
                _id: user.id,
                name: user.name,
                email: user.email,
                tokken: generateToken(user._id)
            })
        }
        //  if something goes wrong than show error
        else {
            res.status(400)
            throw new Error('invalid user data')
        }
    }
)
// .................................

const loginUser = asyncHandler(
    async (req, res) => {
        const { email, password } = req.body
        console.log(req.body)
        const user = await userData.findOne({ email })
        if (user && (await bcrypt.compare(password, user.password))) {
            res.json({
                _id: user.id,
                name: user.name,
                email: user.eamil,
                tokken: generateToken(user._id)
            })
        }
        else {
            res.status(400)
            throw new Error('invalid credentials dude')
        }
    }
)


// .................................
module.exports = { getMe, loginUser, registerUser };