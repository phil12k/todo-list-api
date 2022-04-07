const mongoose = require('mongoose')
const validator = require('validator')

const UserSchema = {
    name : { 
        type : String,
        required : true,
        trim : true
    },
    email : {
        type : String,
        required : true,
        trim : true,
        lowercase: true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error('Email is invalid')
            }
        }
    },
    age : {
        type : Number,
        default  : 0,
        validate(value){
            if( value < 0){
                throw new Error('Age must be positive number')
            }
        }
    }
}

const user = mongoose.model('user', UserSchema)

module.exports = user