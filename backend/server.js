const app = require('./app');
const dotenv = require('dotenv');
const connectDatabase = require('./config/database');

//config
dotenv.config({path:'backend/config/.env'});

//connecting database
connectDatabase();

app.listen(process.env.PORT, () => {
    console.log(`http://localhost:${process.env.PORT}`);
})