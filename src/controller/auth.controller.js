const User = require('../models/user');
const bcrypt=require('bcryptjs');
const jwt =require('jsonwebtoken');
const config=require('../config');
const validations = require('../libs/validations');
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

    const { error } = validations.SchemaSignup.validate(req.body);

    const validate=req.body.email;

    const token=jwt.sign({id:req.body.email},config.SECRET,
        {expiresIn:84600
    });

    if(error ){
        return res.status(404).json({
            error: error.details[0].message
        });
    }else{
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
        });
    }
};

Auth.signin=async(req,res)=>{
    const body=req.body;
    
    const token=jwt.sign({id:req.body.email},config.SECRET,
        {expiresIn:84600
    });

    const { error } = validations.SchemaSignin.validate(body);

    const validate = [body.email];

    if(error){
        return res.status(404).json({
            error: error.details[0].message
        });
    }else{
        await User.getUser(validate,(err,result)=>{

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
                    message:"El email o la contraseña son incorrectos",
                    token:''
                });
            }
        });
    }
     
};

module.exports = Auth;