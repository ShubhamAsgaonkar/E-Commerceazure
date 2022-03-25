const express = require("express");
const router = express.Router();
const {Menproduct} = require("../models");
const {Womenware} = require("../models");

router.post("/",async (req,res)=>{
    const post = req.body;
    await Menproduct.create(post)
    res.json(post);
})

router.post("/women",async (req,res)=>{
    const post = req.body;
    await Womenware.create(post)
    res.json(post);
})

module.exports = router;