const { json } = require('express');
const express = require('express');
const cors=require('cors');
const bodyParser = require('body-parser')
const morgan = require('morgan');
const pkg=require('../package.json');
const ProductsRoutes=require('./routes/products.routes');

const app = express();

app.set('pkg',pkg);

app.use(morgan('dev'));

app.use(cors());

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

app.get('/',(req,res)=>{
    res.json({
        name:app.get('pkg').name,
        auhor:app.get('pkg').author,
        description:app.get('pkg').description,
        version:app.get('pkg').version
    });
});

app.use('/products',ProductsRoutes);

module.exports = app;