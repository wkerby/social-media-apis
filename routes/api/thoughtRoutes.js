const router = require('express').Router();

//bring in the Thought model
const { Thought } = require("../../models");

//get all thoughts
router.get('/', async (req,res) => {
    console.log("Attempting to get all thoughts")
    try {
        const findUsers = await Thought.find({}).populate({path:'reactions',select:'-__v'}).select('-__v');
        res.status(200).json(findUsers);
    }
    catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

//get a thought by thought id
router.get('/:id', async (req,res) => {
    console.log("Attempting to get a thought by id");
    try {
        const thoughtId = req.params.id;
        const specThought = await Thought.findOne({_id: thoughtId}).populate({path:'reactions',select:'-__v'}).select('-__v');

        if (!specThought) {
            res.status(404).json( {message: "no user found with that id"});
        }

        else {
            res.status(200).json(specThought)
        }
        
    }
    
    catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});


module.exports = router;

