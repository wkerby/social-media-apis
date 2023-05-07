const router = require('express').Router();

//bring in the User and Thought models
const {User, Thought} = require("../../models");

//get all users
router.get('/', async(req, res) => {
    try {
        User.find({}, (err, result));
        res.status(200).json(result);
    }

    catch (err) {
        console.log('Oops! Something went wrong!')
        res.status(500).json(err);
    }

})


module.exports = router;