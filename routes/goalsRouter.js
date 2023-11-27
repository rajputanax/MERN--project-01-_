const express = require('express');
const router = express.Router();
const {
    getGoals,
    setGoals,
    updateGoals,
    deleteGoals
} = require('./controller/getGolas');


// ...............................................................
    router.route('/').get(getGoals);
    router.route('/').post(setGoals);
    router.route('/:id').put(updateGoals);
    router.route('/:id').delete(deleteGoals);
// ...............................................................


module.exports = router;