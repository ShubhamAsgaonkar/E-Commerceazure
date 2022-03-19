const express = require("express");
const router = express.Router();
const {order} = require("../models");

router.post("/",async (req,res)=>{
    const post = req.body;
    await order.create(post)
    res.json(post);
})

router.get("/", async (req, res) => {
    const prd = await order.findAll();
    res.json(prd);
  });

router.get("/:id",async(req,res)=>{
  const prd = await order.findAll({
    where:{
      userId:req.params.id
    }
  });
  res.json(prd);
})
    

module.exports = router;