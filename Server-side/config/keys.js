require('dotenv').config();

module.exports = {
    mongoURI: process.env.MONGOURI,
    secretOrKey: process.env.SECRET,
    port: process.env.PORT || 5000 
};