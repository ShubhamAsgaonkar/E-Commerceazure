const express = require("express");
const router = express.Router();
const {Customizer} = require("../models");

router.post("/",async (req,res)=>{
    const post = req.body;
    await Customizer.create(post)
    res.json(post);
})

router.get("/:id",async (req,res)=>{
    const id = req.params.id;
    const prd = await Customizer.findAll({
        where:{
            userId:id
        }
    });
    res.json(prd);
});
module.exports = router;