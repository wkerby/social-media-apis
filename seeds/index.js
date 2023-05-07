const db = require("../config/connection");
const {seedUsers, clearUsers} = require("./userseed");
const {seedThoughts, clearThoughts} = require("./thoughtseed");

db.once("open", () => console.log("ready to seed data"));

// //clear all user documents
// clearUsers();

//seed new user documents
try {
    seedUsers();
    console.log("user data seeded")
}

catch (err) {
    console.log(err);
}

// //clear all thought documents
// clearThoughts();

//seed new thought documents
try {
    seedThoughts();
    console.log("thought data seeded")
}

catch (err) {
    console.log(err);
}
