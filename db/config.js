const mongoose = require('mongoose');

const dbConnection = async() => {
    try {
        await mongoose.connect(process.env.MONGODB_CNN, {

        });

        console.log('GO Online stablished for the DB');
    } catch (error) {
        console.log(error);
        throw new Error('It was not able to connect to the DB !!!');
    }
};

module.exports = {
    dbConnection
};