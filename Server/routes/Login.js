const express = require("express");
const router = express.Router();
const {regs} = require("../models");


router.post("/",async(req,res)=>{
    const details = req.body;
    const user = await regs.findOne({where:{username:details.username,password:details.password}})
    res.send(user);
})


module.exports = router;