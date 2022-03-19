const express = require("express");
const router = express.Router();
const {Menproduct} = require("../models");

router.post("/",async (req,res)=>{
    const post = req.body;
    await Menproduct.create(post)
    res.json(post);
})

module.exports = router;