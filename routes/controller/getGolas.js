
const asyncHandle = require('express-async-handler')
const goal = require('../../model/goalsModal')
// ......................................................................

// ..................
//[Method : Get]
//[route : api/goals]
//[ACCESS : Private]
// ..................
const getGoals = asyncHandle(
    async (req, res) => {
        const goals = await goal.find({user:req.user.id})
        res.status(200).json(goals )
    }
);

// ..................
//[Method : post]
//[route : api/goals]
//[ACCESS : Private]
// ..................
const setGoals = asyncHandle(
    async (req, res) => {
        const goals = await goal.create({
            text: req.body.text,
            user:req.user.id
        })
        console.log(req.body)
       if(!req.body.text){
        res.status(400)
        throw new Error('plz add a text field')
           
    }
    res.status(200).json(goals)
    }
);

// ..................
//[Method : put]
//[route : api/goals/:id]
//[ACCESS : Private]
// ..................
const updateGoals = asyncHandle(
    async (req, res) => {
        const goals = await goal.findById (req.params.id)
        
       if(!goals){
        res.status(400)
        throw new Error(' not found')
           
    }
    const updatedGoals =await goal.findByIdAndUpdate(req.params.id,req.body,{new:true})
    res.status(200).json(updatedGoals)
    
    }
); 

// ..................
//[Method : delete ]
//[route : api/goals/:id]
//[ACCESS : Private]
// ..................
const deleteGoals = asyncHandle(
    async (req, res) => {

        const goalsDel = goal.findById(req.params.id)
      if(!goalsDel){
          res.status(400)
          throw new Error('invalid request')
      }
      const deletedGoals = await goal.findByIdAndDelete(req.params.id)
      res.status(200).json(deletedGoals)
    }
);
// ......................................................................
module.exports = { getGoals, setGoals, updateGoals, deleteGoals };