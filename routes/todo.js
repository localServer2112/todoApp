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

router.post('/delete', function(req, res, next) {
 var id = req.body._id;
 UserData.findByIdAndRemove(id).exec();
 res.redirect('/');
});

router.delete('/:id', async (req,res) => {
    try {
        const removeTodo = await Todo.findByIdAndRemove(id)({
            _id : req.params.id
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