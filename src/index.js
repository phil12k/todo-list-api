const express = require('express')
require('./db/mongoose')
const userRouter = require('./routers/user')
const todoRouter = require('./routers/task')

const app = express()
const router = express.Router()
const port = process.env.PORT || 5000

app.use(express.json())
app.use(userRouter)
app.use(todoRouter)



app.listen(port , () => {
    console.log('Listening on port ' + port)
})