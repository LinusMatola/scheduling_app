const express = require("express");

const router=express.Router();

const {Business,Services}=require("../models");

const { validateToken } = require("../middlewares/AuthMiddleware");

router.get("/",async(req,res)=>{
   const business_list= await Business.findAll();

  //  res.json({listOfPosts:listOfPosts,likedPosts:likedPosts});
   res.json(business_list);
});

router.get("/byId/:id", async (req, res) => {
    const id = req.params.id;
    const business = await Business.findByPk(id);
    res.json(post);
  });

  router.post("/",async(req,res)=>{


    const {business_name,business_type,industry,location,address_line_1,latitude,longitude,city,state,country,status,UserId}=req.body;


   
    Business.create({
        business_name:business_name,
        business_type:business_type,
        industry:industry,
        location:location,

        address_line_1:address_line_1,
        latitude:latitude,
        longitude:longitude,
        city:city,
        state:state,
        country:country,

        status:status,
        UserId:UserId,
       
      });
      res.json("Success");
  

});


router.delete("/:bussId", validateToken, async (req, res) => {
    const bussId = req.params.bussId;
    await Business.destroy({
      where: {
        id: bussId,
      },
    });
  
    res.json("BUSINESS DELETED SUCCESSFULLY");
  });


module.exports=router;

