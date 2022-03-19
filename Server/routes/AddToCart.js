const express = require("express");
const router = express.Router();
const {cart} = require("../models");

router.post("/",async (req,res)=>{
    const post = req.body;
    await cart.create(post)
    res.json(post);
})
router.post("/:id/:pid", async(req,res)=>{
    const post = req.body;
    await cart.update(post,{
        where:{
            userId:req.params.id,
            productId:req.params.pid
        }
    })
    res.json(post);
})

router.get("/:id",async (req,res)=>{
    const id = req.params.id;
    const prd = await cart.findAll({
        where:{
            userId:id
        }
    });
    res.json(prd);
});

router.delete("/:id",async (req,res)=>{
    const id = req.params.id;
    const prd = await cart.destroy({
        where:{
            id:id
        }
    });
    res.json(prd);
});

router.delete("/",async (req,res)=>{
    const prd = await cart.destroy({
        where:{}
    });
    res.json(prd);
});

module.exports = router;