const express = require ('express');
const mongoose = require('mongoose');
const dotenv = require ('dotenv');
const User = require ('./models/User');
const URI = process.env.URI;
const app = express ();
//const PORT = process.env.PORT || 3000;
dotenv.config();
require('dotenv').config() //({path: './config/.env'});


mongoose.connect( URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

    .then(()=> {
        console.log ("Connected to MongoDB");
        app.listen (PORT,()=>{
            console.log (`Server running on port ${PORT}`);
        });
    })
    .catch(err=> console.error('Error connecting to MongoDB:',err));
app.use (express.json());  
//Define routes 
app.get ('/users', async(req,res)=>{
    try{
        const users= await User.find();
        res.json(users);
    } catch (err){
        res.status(500).json({ error: err.message});
    }
} );
app.post ('/users', async (req, res)=>{
    try{
        const user = new User (req.body);
        await user.save () ;
        res.status(201).json(user);
    } catch (err) {
        res.status(400).json({error:err.message });
    }
});
app.put ('/users/:id', async(req, res)=> {
    try{
        const user = await User.findByIdAndUpdate (req.params.id, req.body, {new:true});
        res.json(user);
    } catch (err ){
        res.status(400).json({error:err.message});
    }
    });
app.delete('/users/:id', async (req,res)=>{
    try {
        await User.findByIdAndRemove(req.params.id);
        res.json({message: 'User deleted'});
    } catch (err) {
        res.status(400).json({error : err.message});
    }
    });
    //start the server 
    app.listen(PORT, ()=>{
        console.log(`server is up and listening at ${PORT}`)
    });
    
