const Product=require('../models/product');
const Products={};

 Products.getProducts=(req,res)=>{
    res.json('hoa');
}

Products.getProductsById=(req,res)=>{
    
}

Products.createProducts=(req,res)=>{
    const { nombre,categoria,precio,imgUrl } = req.body;
    const newProduct=new Product({nombre,categoria,precio});

    if(!newProduct.nombre){
        res.status(400).send({ error:true, message: 'Please provide task/status' });
    }else{
        Product.createProducts(newProduct,(err,product)=>{
            if (err)
            res.send(err);
            res.json(product);
        });
    }
}

Products.updateProducts=(req,res)=>{
    res.json('hoa');
}

Products.deleteProducts=(req,res)=>{
    res.json('hoa');
}

 module.exports=Products;