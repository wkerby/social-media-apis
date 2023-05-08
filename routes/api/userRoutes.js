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
});

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
});

//create a new user
router.post('/', async (req,res) => {
    console.log("attempting to create new user");
    try {
        const newUser = await new User({
            username: req.body.username,
            email: req.body.email,

        });
        newUser.save();
        res.status(201).json(newUser)

    }
    catch (err) {
        console.log(err);
        res.status(500).json(err);

    }
});

//update user with provided id
router.put('/:id', async (req,res) => {
    console.log("attempting to update user");
    try {
        const userId = req.params.id;
        const updatedUser = await User.findOneAndUpdate({_id: userId}, req.body, {
            new: true,
            runValidators: true,
        });
        if (!updatedUser) {
            res.status(404).json({message:"Oops! Something went wrong."});
        }
        else {
            res.status(201).json(updatedUser)
        }
    }
    catch (err) {
        console.log(err);
        res.status(500).json(err);

    }

})

//delete user by id
router.delete('/:id', async (req,res) => {
    console.log("attempting to delete user");
    try {
        const userId = req.params.id;
        const delUser = await User.findOneAndDelete({_id: userId});
        if (!delUser) {
            
        }

    }

    catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
})


module.exports = router;