const router = require('express').Router();

//bring in the User and Thought models
const {User, Thought} = require("../../models");

// get all users
router.get('/', async (req,res) => {
    console.log("Attempting to get all users")
    try {
        const findUsers = await User.find({});
        res.status(200).json(findUsers);
    }
    catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
})

//get a user by user id
router.get('/:id', async (req,res) => {
    console.log("Attempting to get a user by id");
    try {
        const userId = req.params.id;
        const specUser = await User.findOne({_id: userId});

        if (!specUser) {
            res.status(404).json( {message: "no user found with that id"});
        }

        else {
            res.status(200).json(specUser)
        }
        
    }
    
    catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
})


module.exports = router;