const sql=require('../database');

const Product=function(product){
    this.nombre=product.nombre;
    this.categoria=product.categoria;
    this.precio=product.precio;
    this.url=product.url;
}

Product.getAllProducts=(result)=>{
    sql.query("SELECT * FROM productos",(err,res)=>{
        if(err){
            console.log("error:",err);
            result(err,null);
        }else{
            console.log("data:",res);
            result(null,res);
        }
    });
};

Product.getProductById=(ProductId,result)=>{
    sql.query("SELECT * FROM productos WHERE id_producto = ? ",ProductId,(err,res)=>{
        if(err){
            console.log("error: ", err);
            result(err, null);
        }else{
            result(null,res);
        }
    });
};

Product.createProducts=(newProduct,result)=>{
    sql.query("INSERT INTO productos SET ?",newProduct,(err,res)=>{
        if(err){
            console.log("error: ", err);
            result(err, null);
        }else{
            console.log(res.insertId);
            result(null, res.insertId);
        }
    });
};

Product.valiteProduct=(nombre,result)=>{
    sql.query("SELECT nombre FROM productos WHERE nombre = ? ",nombre,(err,res)=>{
        if(err){
            console.log("error: ", err);
            result(err, null);
        }else{
            console.log(res.insertId);
            result(null, res.insertId);
        }
    });
};

Product.upDate=(id,product,result)=>{
    sql.query("UPDATE productos SET nombre= ?   WHERE id_producto = ?",[product.nombre,id],(err,res)=>{
        if(err){
            console.log("error :" ,err);
            result(null,err);
        }else{
            result(null,res);
        }
    });
};

Product.remove=(id,result)=>{
    sql.query(`DELETE FROM productos WHERE id_producto = ${id}`,(err,res)=>{
        if(err){
            console.log("error :" ,err);
            result(null,err);
        }else{
            result(null, res);
        }
    });
};
module.exports=Product;