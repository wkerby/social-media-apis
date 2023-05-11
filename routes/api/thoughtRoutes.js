const router = require('express').Router();

//bring in the Thought model
const { Thought, User } = require("../../models");

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

//create a new thought
router.post('/', async (req,res) => {
    console.log("attempting to create new thought");
    try {
        const newThought = await new Thought({ //create new thought from json request body
            thoughtText: req.body.thoughtText,
            username: req.body.username,

        });
        newThought.save();
        const specThought = await User.findOneAndUpdate(
            {_id: req.body.userId}, //takes the id for the user provided in req.body
            {$push: {thought: newThought.id}}, //will add the new thought to the user's thought array
            {new: true}
        );
        if (!specThought) {
            res.status(404).json({message: "Oops! This user id does not exist."})
        }

        res.status(201).json(newThought)

    }
    catch (err) {
        console.log(err);
        res.status(500).json(err);

    }
});

//update a thought by id
router.put('/:id', async (req,res) => {
    console.log("attempting to update thought");
    try {
        const thoughtId = req.params.id;
        const updatedThought = await Thought.findOneAndUpdate({_id: thoughtId}, req.body, {
            new: true,
            runValidators: true, 
        });
        if (!updatedThought) {
            res.status(404).json({message: "Oops! Something went wrong."});
        }
        else {
            res.status(201).json(updatedThought)
        }

    }
    catch (err) {
        console.log(err);
        res.status(500).json(err);

    }

});

//delete a thought by id
router.delete('/:id', async (req,res) => {
    console.log("attempting to delete user");
    try {
        const thoughtId = req.params.id;
        const delThought = await User.findOneAndDelete({_id: thoughtId});
        if (!delThought) {
            res.status(404).json({message: "Oops! No user found with that id."});
            return;
        }
        else {
            res.status(200).json({message: "user deleted successfully!"});
        }
    }
}
);

module.exports = router;



