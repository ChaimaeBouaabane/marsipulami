const mongoose = require('mongoose')
const validator = require('validator')

const Marsupilami = mongoose.model('Marsupilami', {
    userName : {
        type : String,
        required : false,
        trim : true
    },
    password : {
        type : String,
        required : false,
        trim : true, 
        minlength : 7,
        validate(value) {
            if(value.toLowerCase().includes('password')) {
                throw new Error('The password can t contain the word "password", change it !')
            }
        }
    },  
    fullName : {
        type : String,
        required : true,
        trim : true
    },
    age : {
        type : Number,
        required: true,
        default : 0,
        validate(value) {
            if(value<0) {
                throw new Error('You can not have a negative age !')
            }
        }
    },
    family : {
        type : String,
        required : false,
        trim : true
    },
    race : {
        type : String,
        required : false,
        trim : true
    },
    food : {
        type : String,
        required : false,
        trim : true
    },
    friends : [{
        type : mongoose.Types.ObjectId,
        ref : 'Marsupilami'
    }],
})

module.exports = Marsupilami