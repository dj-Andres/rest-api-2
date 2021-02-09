const express= require('express');
const router=express.Router();
const Auth=require('../controller/auth.controller');

router.post('/signup',Auth.signup);

router.post('/signin',Auth.signin);




module.exports=router;

