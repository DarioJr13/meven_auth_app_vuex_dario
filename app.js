const express = require('express');
const mongoose = require('mongoose');
const BodyParser = require('body-parser');
const path = require('path');
const cors = require('cors');
const passport = require('passport');

//Initialize the app
const app = express();

//Middlewares
app.use(BodyParser.urlencoded({
    extended: false
}));
//Json Body Middleware
app.use(BodyParser.json());
//Cors Middleware
app.use(cors());
//Setting up the static directory
app.use(express.static(path.join(__dirname, 'public')));

//Use The Passport Middleware
app.use(passport.initialize());
//Bring in The Passport Strategy
require('./config/passport')(passport);

//Bring in the Database Config and Connect with the DataBase
const db = require('./config/keys').mongoURI;
mongoose.connect(db, { 
    useNewUrlParser: true, 
    useUnifiedTopology: true
}).then(() => {
    console.log('DataBase connected successfully',db)
}).catch(err => {
    console.log('Unable to connect with the DataBase',err)
});

const users = require('./routes/api/users');
app.use('/api/users', users);


app.get('*', (req, res) => {
   res.sendFile(path.join(__dirname, 'public/index.html'));
})

const PORT = process.env.PORT || 3200;

app.listen(PORT, () => {
    console.log('Server Started on Port', PORT);
})