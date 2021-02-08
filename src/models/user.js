const sql=require('../database');

const user=function(user){
    this.cedula=user.cedula;
    this.nombre=user.nombre;
    this.apellido=user.apellido;
    this.fecha_nac=user.fecha_nac;
};

user.createUser = function (newUser, result) {    
    sql.query("INSERT INTO users set ?", newTask, function (err, res) {
            
            if(err) {
                console.log("error: ", err);
                result(err, null);
            }
            else{
                console.log(res.insertId);
                result(null, res.insertId);
            }
        });           
};

module.exports=user;