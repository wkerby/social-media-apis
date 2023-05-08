//require validateEmail function
const validateEmail = require('../utils/helpers');

//require in mongoose
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: { type: String, unique: true, required: true, trim: true},
    email: { type: String, unique: true, required: true, trim: true, validate: { validator: validateEmail, message: "Please provide a valid email address" },},
    thoughts: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Thought'}],
    friends: [{type: mongoose.Schema.Types.ObjectId, ref: 'User'}]
},
{
    toJSON: {
        virtuals: true,
        getters: true
    }
});

userSchema.virtual('friendCount').get(function () {
    if (this.friends) {
        return this.friends.length;
    }

    else {
        return 0;
    }
    
});

const User = mongoose.model('User', userSchema);

module.exports = User;