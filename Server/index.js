const path = require('path');
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const morgan = require('morgan');
const bodyParser = require('body-parser');

const AdminRoutes = require('./Routes/AdminRoutes');
const ArticleRoutes = require('./Routes/ArticleRoutes')
const CustomerRoutes = require('./Routes/CustomerRoutes');
const OrderRoutes = require('./Routes/OrderRoutes');

mongoose.connect('mongodb://0.0.0.0:27017/RestaurantWebApp');

const app = express();

// app.use(express.static(path.join(__dirname, 'public')))
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
app.use(express.json());
app.use(cors());
app.use(morgan('dev'));

app.use('/', AdminRoutes);
app.use('/', ArticleRoutes)
app.use('/', CustomerRoutes);
app.use('/', OrderRoutes);

const port = process.env.PORT || 3001
app.listen(port, console.log(`Listening on port ${port}...`));