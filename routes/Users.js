const express = require("express");

const router=express.Router();

const bcrypt = require("bcrypt");

const { sign } = require("jsonwebtoken");

const {Users,Business,Staffs,Customers,Services}=require("../models")

const {validateToken}=require("../middlewares/AuthMiddleware");


router.post("/",async(req,res)=>{

  try {
 

  const{first_name,last_name,email,phone_no,country,state,city,password,profile_image,account_type}=req.body;

  var role="";

 if(account_type==1){

  role="Guest";

 }
 else if (account_type==2) {

  role="Host";
   
 } else {
   
  role="Guest";
 }

 var status="Active";


  bcrypt.hash(password,10).then((hash)=>{

    Users.create({
      first_name:first_name,
      last_name:last_name,
      username:phone_no,
      email:email,
      phone_no:phone_no,
      role:role,
      country:country,
      state:state,
      city:city,
      status:status,
      account_type:account_type,
      profile_image:profile_image,
      password:hash

    });
    res.json("USER SAVED");
  });

} catch (error) {
  console.log('error', error);
  // Do whatever you want, throw the error again if you want but it will just produce `UnhandledPromiseRejectionWarning` again, if you throw it again.
}


});


router.post("/login", async (req, res) => {

  const {username, password } = req.body;

  const user = await Users.findOne({ where: { username: username } });

  if(!user){
    res.json({error:"User Does not exist"});

    return;

  } 

  bcrypt.compare(password, user.password).then((match) => {
    if (!match){
      res.json({ error: "Wrong Username And Password Combination" });
    } 
    else{

      const accessToken = sign(
        {username: user.username,first_name: user.first_name,role:user.role, id: user.id},
        "importantsecret"
        
      );
    
      res.json({ token: accessToken, username: username, first_name: user.first_name,phone:user.phone,role:user.role, id: user.id });
    }

  
  });

});




router.get("/mybuss", validateToken,async (req, res) => {
  const myStaffList = await Business.findAll({
    where: { UserId: req.user.id }, include: [Staffs],
  });

  const myCustomersList = await Business.findAll({
    where: { UserId: req.user.id }, include: [Customers],
  });

  const myServicesList = await Business.findAll({
    where: { UserId: req.user.id }, include: [Services],
  });

  res.json({myStaffList:myStaffList,myCustomersList:myCustomersList,myServicesList:myServicesList});
});


//This where we get the information about the user
router.get("/auth", validateToken, (req, res) => {
  res.json(req.user);
});







module.exports=router;