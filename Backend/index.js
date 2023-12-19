const express = require('express');
const cors = require('cors');
const app = express();
const mongoose = require ('mongoose');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const managerRouter = require('./src/routes/manager.router');
const studentRouter = require('./src/routes/student.router');
const instructorRouter = require('./src/routes/instructor.router');
const authRouter = require('./src/routes/auth.router');


//connect database mongodb
mongoose.connect("mongodb+srv://khailam1029:10042002@cluster0.ppddqen.mongodb.net/?retryWrites=true&w=majority")
    .then(() => {
        console.log("Connected to MongoDB");
    })
    .catch((error) => {
        console.error("Error connecting to MongoDB:", error);
    });

app.use(cors());
app.use(morgan("common"));
app.use(bodyParser.json());

app.use('/instructors', instructorRouter);
app.use('/managers', managerRouter);
app.use('/students', studentRouter);
app.use('/auth', authRouter);

app.listen(8000, () => {
    console.log("Server is runing...");
});