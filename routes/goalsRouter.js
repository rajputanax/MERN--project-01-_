const express = require('express');
const router = express.Router();
const {
    getGoals,
    setGoals,
    updateGoals,
    deleteGoals
} = require('./controller/getGolas');
const {protect}=require('../routes/controller/middleware/authmiddleware')


// ...............................................................
    router.route('/').get(protect,getGoals);
    router.route('/').post(protect,setGoals);
    router.route('/:id').put(protect,updateGoals);
    router.route('/:id').delete(protect,deleteGoals);
// ...............................................................


module.exports = router;