const router = require('express').Router();

//bring in the Thought model
const { Thought, User, Reaction } = require("../../models");

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
    console.log("attempting to delete thought");
    try {
        const thoughtId = req.params.id;
        const delThought = await Thought.findOneAndDelete({_id: thoughtId});
        if (!delThought) {
            res.status(404).json({message: "Oops! No user found with that id."});
            return;
        }
        else {
            res.status(200).json({message: "thought deleted successfully!"});
        }
    }
    catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
    
}
);

//create a reaction stored in a single thought's reaction array field
router.post('/:thoughtId/reactions', async(req,res) => {
    const thoughtId = req.params.thoughtId;
    const newReaction = await new Reaction
    try {
        const specThought = await Thought.findOneAndUpdate({_id:thoughtId}, //searching for the thought by its id
            {$push: {reactions: req.body}}, //this will take req.body object and use it to create a new reaction in the thought's reaction array
            {new: true, runValidators: true});
        
        if (!specThought) { //if the search comes up empty
            return res.status(404).json({ message: "Oops! No thought found with that id."});
        }
        else {
            res.status(200).json(specThought);
        }
        

    }

    catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
})

module.exports = router;



