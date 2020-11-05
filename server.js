const express = require('express');
const cors = require('cors');
const nodemailer = require('nodemailer');
const mongoose = require('mongoose');   

require('dotenv').config();

const app = express();
const port = process.env.PORT || 5001;

app.use(cors());
app.use(express.json());

const uri = process.env.ATLAS_URI;
mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true });

const connection = mongoose.connection;
connection.once('open',()=>{
    console.log("MongoDB database connection established successfully");
});

const contactForm_route = require('./routes/contactForm_route');
const commentRouter = require('./routes/comment');

app.use('/contact', contactForm_route);
app.use('/comment',commentRouter);

app.get('/',(req,res)=>{
    res.send('Backend Working');
})

app.listen(port,()=>{
    console.log(`Server running on port: ${port}`);
});