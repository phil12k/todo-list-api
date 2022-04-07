const mongoose = require('mongoose');

const TodoSchema = {
    description : { 
        type : String,
        required : true,
        trim : true
    },
    completed : {
        type : Boolean,
        default: false
    }
    
}

const todo = mongoose.model('Todo', TodoSchema)

module.exports = todo