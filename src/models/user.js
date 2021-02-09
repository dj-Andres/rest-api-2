const sql=require('../database');
const bcrypt=require('bcryptjs');
const User=function(user){
    this.nombre=user.nombre;
    this.email=user.email;
    this.password=user.password;
}

User.createUser=(newUser,result)=>{
    sql.query("INSERT INTO usuarios SET ?",newUser,(err,res)=>{
        if(err){
            console.log("error: ", err);
            result(err, null);
        }else{
            console.log(res.insertId);
            result(null, res.insertId);
        }
    });
};

User.getUser=(email,result)=>{
    sql.query("SELECT * FROM usuarios WHERE email = ? ",email,(err,res)=>{
        if(err){
            console.log("error: ", err);
            result(err, null);
        }else{
            result(null,res);
        }
    });
};

module.exports=User;