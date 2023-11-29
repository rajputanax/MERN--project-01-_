const express = require ('express');
const { getMe,loginUser,registerUser}=require('./controller/userControllers')
const router = express.Router();

router.route('/').post(loginUser);
router.route('/login').get( getMe)
router.route('/reg').post(registerUser)

module.exports=router;