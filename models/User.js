//require validateEmail function
const validateEmail = require('../utils/helpers');

//require in mongoose
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: { type: String, unique: true, required: true, trim: true},
    email: { type: String, unique: true, required: true, trim: true, validate: [validateEmail, "Please provide a valid email address"]}, 
    thoughts: { type: Array, }
})