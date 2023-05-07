const router = require('express').Router();

//bring in the User and Thought models
const {User, Thought} = require("../../models");

// get all users
// router.get('/', async(req, res) => {
//     console.log("attempting to get all users!")
//     try {
//         await User.find({}, (err, result));
//         res.status(200).json(result);
//     }

//     catch (err) {
//         console.log('Oops! Something went wrong!')
//         console.log(err);
//         res.status(500).json(err);
//     }

// })

// router.get('/', (req, res) => {
//   // Using model in route to find all documents that are instances of that model
//   User.find({}, (err, result) => {
//     if (result) {
//       res.status(200).json(result);
//     } else {
//       console.log('Uh Oh, something went wrong');
//       res.status(500).json({ error: 'Something went wrong' });
//     }
//   });
// });

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

module.exports = router;