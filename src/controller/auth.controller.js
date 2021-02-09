const User = require('../models/user');
const jwt =require('jsonwebtoken');
const config=require('../config');
const Auth={};

Auth.signup= async(req,res)=>{
    const { nombre,email, password }=req.body;

    const newUser = new User({ nombre,email,password });

     await User.createUser(newUser,(err,user)=>{
            if (err)
             res.send(err);
             res.status(201).json(user);
    });

    const token=jwt.sign({id:email},config.SECRET,
        {expiresIn:84600
    })

    res.status(200).json({token});
};

Auth.signin=(req,res)=>{
     User.getUser(req.body.email,(err,result)=>{
        
        if(err) throw err;

        if(result.length > 0){
            res.status(200).json(result);
        }else{
            res.json({
                "message":"No encontrado"
            });
        }
    });
};

module.exports = Auth;