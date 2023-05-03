const mongoose = require('mongoose');
const connectionStringURI = 'mongodb://127.0.0.1:27017/socialmediaDB';

//associate mongoose with your local database
mongoose.connect(connectionStringURI,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

//export connection
module.exports = mongoose.connection;