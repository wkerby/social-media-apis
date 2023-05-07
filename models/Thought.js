//require User model
const User = require("./User");

//create var for current date and time
const date = new Date();
const today = date.toLocaleString();
//require in mongoose
const mongoose = require('mongoose');

const thoughtSchema = new mongoose.Schema({
    thoughtText: { type: String, required: true, min:1, max:280},
    // createdAt: { type: Date, default: today },
    username: { type: String, required: true, unique: true, ref: 'User'},
},
{
    timestamps:true //automatically creates fields for created and updated time stamps
});

const getCurrDate = () => { //create a function that retrieves the created date of the thought
    return this.createdAt;
}

thoughtSchema.virtual('dateCreated').get(getCurrDate); //use function in virtual 

const Thought = mongoose.model('Thought', thoughtSchema);

module.exports = Thought; 