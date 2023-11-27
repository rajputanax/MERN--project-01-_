const express = require ('express');
const { getMe,loginUser,registerUser}=require('../routes/controller/userController')
const router = express.Router();

router.route('/').post(loginUser);
router.route('/login').get( getMe)
router.route('/reg').post(registerUser)

module.exports=router;