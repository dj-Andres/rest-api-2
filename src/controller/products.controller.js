const Product=require('../models/product');
const Products={};

 Products.getProducts=async(req,res)=>{
    await Product.getAllProducts((err, result) =>{

        console.log('controller')
        if (err)
          res.send(err);
          console.log('res', result);
        res.status(200).json(result);
      });
}

Products.getProductsById=async (req,res)=>{
    await Product.getProductById(req.params.productsId,(err,producto)=>{
        if(err) throw err;

        if(producto.length > 0){
            res.status(200).json(producto);
        }else{
            res.json({
                "message":"No encontrado"
            });
        }
         
        
    });
}

Products.createProducts= async(req,res)=>{
    const { nombre,categoria,precio } = req.body;
    const newProduct= await new Product({nombre,categoria,precio});

    if(!newProduct.nombre){
        res.status(400).send({ error:true, message: 'El producto ya se encuentra registrado' });
    }else{
        Product.createProducts(newProduct,(err,product)=>{
            if (err)
            res.send(err);
            res.status(201).json(product);
        });
    }
}

Products.updateProducts= async(req,res)=>{
    const { productsId } = req.params;
    
    await Product.upDate(productsId, new Product(req.body),(err,result)=>{
        if(err)
         res.send(err);
        res.status(204).json(result);
    });
}

Products.deleteProducts= async (req,res)=>{
    const { productsId } = req.params;
    await Product.remove(productsId,function(err,product){
        if(err)
         res.send(err);
        res.status(204).json({
            "message":"El producto fue eliminado exitosamente",
            "result":product
        });
    });
}

 module.exports=Products;