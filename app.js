const express = require('express');
const bodyParser = require('body-parser');
const product = require('./routes/product.route');
const mongoose = require('mongoose');
//mongoose.set('useFindAndModify', false);
mongoose.set('useUnifiedTopology', true);
const app = express();

let dev_db_url = 'mongodb+srv://someuser:abcd1234@cluster0-z3kyn.mongodb.net/test?retryWrites=true&w=majority';

let mongoDB = process.env.MONGODB_URI || dev_db_url;

mongoose.connect(mongoDB, { useNewUrlParser: true });

mongoose.Promise = global.Promise;

let db = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB connection error:'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use('/products', product);

let port = process.env.port || 3000;
app.listen(port,() => {
    console.log("server running at port", port);
})





