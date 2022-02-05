const express = require("express");

const router=express.Router();

const {Services}=require("../models");

const { validateToken } = require("../middlewares/AuthMiddleware");


router.post("/",async(req,res)=>{
    // const staff=req.body; 
const {service_name,service_type,service_cost,BusinessId}=req.body;

Services.create({
    service_name:service_name,
    service_type:service_type,
    service_cost:service_cost,
    BusinessId:BusinessId,
   
  });
  res.json("Service created Successfully");

});


module.exports=router;


