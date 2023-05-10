const router = require('express').Router();

//bring in the Thought model
const { Thought } = require("../../models");

//get all thoughts
router.get('/', async (req,res) => {
    console.log("Attempting to get all users")
    try {
        const findUsers = await Thought.find({}).populate({path:'reactions',select:'-__v'}).select('-__v');
        res.status(200).json(findUsers);
    }
    catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});
