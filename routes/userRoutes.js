const express = require ('express');
const { getMe,loginUser,registerUser}=require('./controller/userControllers')
const router = express.Router();
const {protect}=require('./controller/middleware/authmiddleware')

router.route('/').post( loginUser);
router.route('/login').get( protect ,getMe)
router.route('/reg').post(registerUser)

module.exports=router;