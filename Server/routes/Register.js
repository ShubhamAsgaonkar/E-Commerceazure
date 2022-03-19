const express = require("express");
const router = express.Router();
const {regs} = require("../models");

router.post("/",async (req,res)=>{
    const post = req.body;
    await regs.create(post)
    res.json(post);
})

module.exports = router;