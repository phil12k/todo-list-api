const express = require('express')
const router = new express.Router()
const todo = require('../models/task')
require('../db/mongoose')



router.get('/tasks', (req, res) => {
    todo.find({}).then( (getNewTask )=> {
        res.status(200).send(getNewTask)
    }).catch((error) =>{
        res.status(500).send()
    })

})



router.get('/tasks/:id', (req, res) => {
    const _id = req.params.id
    todo.findById(_id).then( (getNewTask) => {
        if(!getNewTask) {res.status(404).send()}
        else res.status(200).send(getNewTask)
    }).catch( (error) => {
        res.status(500).send()
    })
})



router.post('/tasks', (req, res) => {
    const createNewTask = new todo(req.body)
    createNewTask.save().then( () => {
        console.log(createNewTask)
        res.status(200).send(createNewTask)

    }).catch( (err) => {
        res.status(400).send(err)
        console.log(err)
    })
})



router.patch('/tasks/:id', async (req, res) => {
    const updates = Object.keys(req.body)
    const allowedUpdates = ['description', 'completed' ]
    const isValidOperations = updates.every( (update) => { return allowedUpdates.includes(update) })

    if(!isValidOperations) {return res.status(400).send({ error : ' invalid operation'})}
   
    try {
        const updatedTask = await todo.findByIdAndUpdate(req.params.id, req.body, {new : true, runValidators : true})      
        if (!updatedTask){return res.status(400).send()}
        res.send(updatedTask)
    
    }catch (err) {res.status(400).send(err)}
})



router.delete('/tasks/:id', async (req, res) => {
    const _id = req.params.id
    
    try{
        const deletedTask = await todo.findByIdAndDelete(_id)
        if(!deletedTask){res.status(404).send()}
        res.send(deletedTask)

    }catch(err){res.status(500).send(err)}
})


module.exports = router