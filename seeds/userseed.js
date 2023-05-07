const User = require("../models/User");

const users = [
    {username: "wkerby99", email: "w.kerby99@gmail.com"},
    {username: "bfernandes8", email: "ggm8@mufc.com"},
    {username: "TheTroutBum", email: "trosenbauer@simmsfishing.com"},
];

const seedUsers = async () => {
    try {
        for (var i = 0; i < users.length; i++) {
            await User.create(users[i]);
        }
    }
    catch (err) {
        console.log(err);
    }
}

module.exports = seedAll; 