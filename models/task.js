const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
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
});


const TaskData = mongoose.model('TaskData', taskSchema);

module.exports = TaskData;