const express = require('express');
const router = express.Router();
const Todo = require('../model/Todo');


router.get('/', async (req, res)=>{
    try {
        const todos = await Todo.find();
        res.json(todos);
    } catch (error) {
        res.json({
            message : error
        });
    }
})

// get uncompleted todos 
router.get('/uncompleted', async (req,res)=>{
    try {
        const uncompleted = await Todo.find({status:"Undone"});
        res.json(uncompleted)
    } catch (error) {
        res.json({
            message : err
        })
    }
})

// get completed todos 
router.get('/completed', async (req,res)=>{
    try {
        const completed = await Todo.find({status:"Done"})
        res.json(completed)
    } catch (error) {
        res.json({
            message : err
        })
    }
})

router.post('/',async (req,res) => {
    // using the model, we create a new Todo
    const todo = new Todo({
        title : req.body.title,
    });
    try{
    const savedTodo = await todo.save();
    res.status(200).json(savedTodo);
    }
    catch(err){
        res.json({
            message: err
        })
    }
    
})

router.delete('/:todoId', async (req,res) => {
    try {
        const removeTodo = await Todo.remove({
            _id : req.params.todoId
        });
        res.json(removeTodo);
    } catch (err) {
        res.json({
            message : err
        })
    }
})

router.patch('/:todoId', async (req,res) => {
    // update the todo based on ID
    try {
        const updateTodo = await Todo.updateOne(
            {_id: req.params.todoId},
            {$set : {status : req.body.status}
        }
            );
            res.json(updateTodo);
    } catch (error) {
        
    }
    
})
// router.post('/', (req,res) => {
//     // using the model, we create a new Todo
//     const todo = new Todo({
//         title : req.body.title,
//     });
//     todo.save()
//     .then(data => {
//         res.status(200)
//         .json(data)
//     }).catch(err => {
//         res.json({message : err})
//     })
// })

module.exports =  router; 