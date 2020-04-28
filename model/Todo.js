const mongoose = require('mongoose');

const TodoSchema = mongoose.Schema({ 
    todo_id : {
        type: String
    },
    title : {
        type: String
    },
    status : {
        type: String,
        default :  'Undone'
    },
    date_added : {
        type : Date,
        default : Date.now
    }
});

module.exports = mongoose.model('Todos',TodoSchema);