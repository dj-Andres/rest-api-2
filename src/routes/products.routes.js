const express= require('express');
const router=express.Router();
const Products=require('../controller/products.controller');
const { verifyToken }=require('../middlewares/auth.jwt');
router.get('/',Products.getProducts);

router.post('/',verifyToken, Products.createProducts);

router.get('/:productsId',Products.getProductsById);

router.put('/:productsId',verifyToken, Products.updateProducts);

router.delete('/:productsId',verifyToken, Products.deleteProducts);

module.exports=router;

