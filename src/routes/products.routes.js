const express= require('express');
const router=express.Router();
const Products=require('../controller/products.controller');

router.get('/',Products.getProducts);

router.post('/',Products.createProducts);

router.get('/:productsId',Products.getProductsById);

router.put('/:productsId',Products.updateProducts);

router.delete('/:productsId',Products.deleteProducts);

module.exports=router;

