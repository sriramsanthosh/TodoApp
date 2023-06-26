const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    fname:{
        type: String,
        required: true,
    },
    lname:{
        type: String,
        required: true,
    },
    email : {
        type : String,
        required : true,
        unique : true
    },
    password :{
        type : String,
        required: true
    },
    tasks: [
        {
            description:{
                type: String, 
                default: "Task Description"
            },
            category:{
                type: String,
                default: "Label"
            },
            dueDate:{
                type: String,
                default: "Due Date"
            }
        }
    ]
}, {
    timestamps: true
});

const User = mongoose.model('User', userSchema);
module.exports = User;

