const mongoose = require('mongoose');

const connectDatebase = () => {
    mongoose.connect(process.env.DB_URI, { useNewUrlParser: true, useUnifiedTopology: true }).then((data) => {
        console.log(`Mongodb connected with server: ${data.connection.host}`);
    }).catch((error) => {
        console.error("mongodb error", error);
    })
}

module.exports = connectDatebase;