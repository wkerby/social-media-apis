//bring in the Thought model
const {Thought} = require("../models");

const thoughts = [
    {thoughtText: "This is a test thought", username: "wkerby99"},
    {thoughtText: "Seeding data is my favorite", username: "bfernandes8"},
];

const clearThoughts = async () => {
    try {
        await Thought.collection.deleteMany({});
    }
    catch (err) {
        console.log(err);
    }
}

const seedThoughts = async () => {

    try {
        await Thought.create(thoughts);
    }
    // try {
    //     for (var i = 0; i < thoughts.length; i++) {
    //         await Thought.create(thoughts[i]);
    //     }
    // }
    catch (err) {
        console.log(err);
    }
};

module.exports = {seedThoughts, clearThoughts};