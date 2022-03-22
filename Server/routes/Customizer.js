const express = require("express");
const router = express.Router();
const {Customizer} = require("../models");

router.post("/",async (req,res)=>{
    const post = req.body;
    await Customizer.create(post)
    res.json(post);
})

module.exports = router;