const mongoose = require ('mongoose');
const dotenv = require ('dotenv');

const userSchema = new mongoose.Schema ({
    name: String,
    email: String,
});

const User = mongoose.model('User', userSchema) ;
module.exports=User;