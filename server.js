require('dotenv').config({path: "./config.env"});
const express = require('express');
const connectDB = require('./config/db');
const errorHandler = require('./middleware/error');
var cors = require('cors')

connectDB();
const app = express();
app.use(cors({ origin: true }));

app.use(express.json());
app.use((req,res, next)=>{
    res.setHeader('Access-Control-Allow-Origin',"*");
    res.setHeader('Access-Control-Allow-Headers',"Origin, X-Requested-With, Content-Type, Accept");
    res.header('Access-Control-Allow-Credentials', true);
    next();
});


app.use('/api/auth', require('./routes/auth'));
app.use('/api/private', require('./routes/private'));

app.use(errorHandler);

const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

process.on("unhandledRejection", (err, promise) => {
    console.log(`Error: ${err}`);
    server.close(() => process.exit(1));
})