const User = require('../models/user');
const bcrypt=require('bcryptjs');
const jwt =require('jsonwebtoken');
const config=require('../config');
const Auth={};

Auth.getAll=(req,res)=>{
    User.getAllUsers((err, result) =>{
        console.log('controller')
        if (err)
          res.send(err);
          console.log('res', result);
        res.status(200).json({
            success:1,
            data:result
        });
      });
};

Auth.signup= (req,res)=>{
    
    const body=req.body;
    const salt=bcrypt.genSaltSync(10);
    body.password=bcrypt.hashSync(body.password,salt);

    const newUser = new User(body);

    const token=jwt.sign({id:req.body.email},config.SECRET,
        {expiresIn:84600
    });

    const validate=req.body.email;

    User.email(validate,(err,result)=>{
        if(err) throw err;
        
        if(result.length > 0){
            return res.json({
                success:0,
                message:"El email ya se encuentra registrado"
            });
        }else{
            User.createUser(newUser,(err,user)=>{
                if (err)
                 res.send(err);
                 res.status(201).json({
                    success:1,
                    message:"User created",
                    data:user,
                    token:token
                 });     
            });
        }
    })
};

Auth.signin=(req,res)=>{
    const body=req.body;

    const token=jwt.sign({id:req.body.email},config.SECRET,
        {expiresIn:84600
    });
     User.getUser(body.email,(err,result)=>{

        if(err) throw err;

        if(result.length > 0){
            res.status(200).json({
                success:1,
                data:result,
                token:token
            });
        }else{
            res.json({
                success:0,
                message:"No encontrado",
                token:''
            });
        }
    });
};

module.exports = Auth;