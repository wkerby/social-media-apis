//require Reaction schema
const Reaction = require("./Reaction");

const {Schema, model} = require('mongoose');

const thoughtSchema = new Schema({
    thoughtText: { type: String, required: true, min:1, max:280},
    // createdAt: { type: Date, default: today },
    username: { type: String, required: true},
    reactions: [Reaction.schema]
},
{
    timestamps:true //automatically creates fields for created and updated time stamps
});

const getCurrDate = () => { //create a function that retrieves the created date of the thought
    return this.createdAt;
}

thoughtSchema.virtual('dateCreated').get(getCurrDate); //use function in virtual 
thoughtSchema.virtual('reactionCount').get(function () {
    return this.reactions.length;
});
const Thought = model('Thought', thoughtSchema);

module.exports = Thought; 