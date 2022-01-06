const app = require('./app');
const dotenv = require('dotenv');
const connectDatabase = require('./config/database');

//handling uncaught exceptions
process.on('uncaughtException', (err) => {
    console.log(`Error: ${err.message}`);
    console.log(`Shutting down the server due to Uncaught Exception`);
    process.exit(1);
})

//config
dotenv.config({ path: 'backend/config/.env' });

//connecting database
connectDatabase();

const server = app.listen(process.env.PORT, () => {
    console.log(`http://localhost:${process.env.PORT}`);
});

//unhandled promise rejection
process.on("unhandledRejection", (err) => {
    console.log(`Error: ${err.message}`);
    console.log(`Shutting down the server due to Unhandled Promise Rejection`);
    server.close(() => {
        process.exit(1)
    });
});
