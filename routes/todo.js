const express = require('express');
const router = express.Router({ automatic405: true });
const Todo = require('../model/Todo');

// get all Todos => working
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

// get uncompleted todos => working
router.get('/uncompleted', async (req,res)=>{
    try {
        const uncompleted = await Todo.find({status:"Undone"}, (err,undone_todos) =>{
            if (err) return res.status(500).send(err)
            return res.status(200).send(undone_todos);})
    } catch (error) {
        res.json({
            message : err
        })
    }
})

// get completed todos  => working
router.get('/completed', async (req,res)=>{
    try {
        const completed = await Todo.find({status:"Done"}, (err,done_todos) =>{
            if (err) return res.status(500).send(err)
            return res.status(200).send(done_todos);})
    } catch (error) {
        res.json({
            message : err
        })
    }
})

// post to db => working
router.post('/',async (req,res) => {
    // using the model, we create a new Todo
    const todo = new Todo({
        todo_id : req.body.id,
        title : req.body.title,
    });
    try{
    const savedTodo = await todo.save();
    return res.status(200).json(savedTodo);
    }
    catch(err){
        res.json({
            message: err
        })
    }
    
})


router.delete('/:id', async (req,res) => {
    try {
        const removeTodo = await Todo.findByIdAndRemove(id)({
            _id : req.params.id
        });
        res.json(removeTodo);
    } catch (err) {
        res.json({
            message : err
        });
    }
});




router.put('/update', async (req,res) => {
    // update the todo based on ID
    // Find the existing resource by ID
    Todo.findByIdAndUpdate(
        // the id of the item to find
        req.params.todoId,
        
        // the change to be made. Mongoose will smartly combine your existing 
        // document with this change, which allows for partial updates too
        req.body,
        
        // an option that asks mongoose to return the updated version 
        // of the document instead of the pre-updated one.
        {new: true},
        
        // the callback function
        (err, todo) => {
        // Handle any possible database errors
            if (err) return res.status(500).send(err);
            return res.send(todo);
        }
    )




    // try {
    //     const updateTodo = Todo.findOneAndUpdate({_id:req.params._id}, req.body, function (err, todo) {
    //         if (err) {
    //             return res.status(500).send(err);
    //         }
    //         res.send(todo);
    //       });
    //         res.json(updateTodo);
    // } catch (error) {
    //     res.json({message : error});

    // }
    
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