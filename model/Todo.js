const mongoose = require('mongoose');

const TodoSchema = mongoose.Schema({ 
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