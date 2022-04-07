const express = require('express')
const router = new express.Router()
const user = require('../models/user')
require('../db/mongoose')



router.get('/users/', (req, res) => {
    user.find({}).then( (getUsersInfo) => { 
        res.status(200).send(getUsersInfo)
        console.log(getUsersInfo)

    }).catch( (err) => {
        res.status(500).send()
    })
})


router.get('/users/:id/', (req, res) => {
    const _id = req.params.id
    user.findById(_id).then( (getUserInfo) => {
        if( !getUserInfo) { return res.status(404).send() }
        else res.status(200).send(getUserInfo)
    }).catch((error) => {
        res.status(500).send()
    })
})


router.post('/users', (req, res) => {
    const createNewUser = new user(req.body)
    createNewUser.save().then( () => {
        console.log(createNewUser)
        res.status(200).send(createNewUser)

    }).catch( (error) => {
        res.status(400).send(error)
        console.log(error)

    })  
})



router.patch('/users/:id', async (req, res) => {
    const updates = Object.keys(req.body)
    const allowedUpdates = ['name', 'email' , 'age']
    const isValidOperations = updates.every( (update) => { return allowedUpdates.includes(update)})

    if(!isValidOperations){ return res.status(400).send({ error : ' invalid operation'})}
    
    try {
        const updatedUser = await user.findByIdAndUpdate(req.params.id, req.body, {new : true, runValidators : true}) 
        if (!updatedUser){  return res.status(400).send()}

    res.send(updatedUser)
    }catch (err){
        res.status(400).send(err)
    }
})




router.delete('/users/:id', async (req, res) => {
    const _id = req.params.id
    try{
        const deletedUser = await user.findByIdAndDelete( _id )
        
        if(!deletedUser) {
            res.status(404).send()
        }
        res.send(deletedUser)
        
    }catch(err){
        res.status(500).send(err)
    }
})


module.exports = router