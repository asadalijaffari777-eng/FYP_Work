const mongoose = require('mongoose');
const connect = mongoose.connect('mongodb://localhost:27017/FYP_LOGIN_DATABASE');

connect.then(()=>{
    console.log('Database is connected successfully');
})
.catch(()=>{
    console.log('Database cannot be connected');
})

const LoginSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
})

const collection = new mongoose.model('FYP_Users', LoginSchema);

module.exports = collection;