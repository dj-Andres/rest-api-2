const sql=require('../database');

const Product=function(product){
    this.nombre=product.nombre;
    this.categoria=product.categoria;
    this.precio=product.precio;
    this.imgUrl=product.imgUrl;
    this.fecha=new Date();
}

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
module.exports=Product;