//require in mongoose
const mongoose = require('mongoose');

const reactionSchema = new mongoose.Schema({
    reactionId: { type: mongoose.Schema.Types.ObjectId, default: new mongoose.Types.ObjectId()},
    
    reactionBody: { type: String, required: true, max: 280 },

    username: { type: String, required: true}
},
{
    timestamps:true //automatically creates fields for created and updated time stamps
});

const getCurrDate = () => { //create a function that retrieves the created date of the thought
    return this.createdAt;
}

reactionSchema.virtual('dateCreated').get(getCurrDate); //use function in virtual 

const Reaction = mongoose.model('Reaction', reactionSchema);
module.exports = Reaction; 