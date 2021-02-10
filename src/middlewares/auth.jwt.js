const jwt=require('jsonwebtoken');
const config=require('../config');
module.exports = {
    verifyToken:(req,res,next)=>{
        try{
            const token= req.headers["x-acces-token"];
        
            console.log(token);

            if(!token) return res.status(404).json({succes:0,message:'Not access'})

            const decode=jwt.verify(token,config.SECRET);

            console.log(decode);

            next()
        }catch(error){
            return res.status(401).json({succes:0,message:'No Authorizacion'})
        }
        
    }   
}