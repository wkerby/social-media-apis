//require in mongoose
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    thoughtText: { type: String, required: true, min:1, max:280},
    email: { type: String, unique: true, required: true, trim: true, validate: [validateEmail, "Please provide a valid email address"]}, 
    thoughts: { type: Array, }
})