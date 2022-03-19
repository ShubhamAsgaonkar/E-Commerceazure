const express = require("express");
const router = express.Router();
const { Menproduct } = require("../models");

router.get("/", async (req, res) => {
  const prd = await Menproduct.findAll();
  res.json(prd);
});

router.get("/byid/:id", async (req, res) => {
  const id = req.params.id;
  const prd = await Menproduct.findByPk(id);
  res.json(prd);
});

router.post("/update/:id", async (req, res) =>{
  const id = req.params.id;
  const prd = await Menproduct.update(req.body, {
    where: {
      id: id,
      },
    });
  res.json(prd);
})

router.delete("/delete/:id", async (req, res) => {
  const id = req.params.id;
  const prd = await Menproduct.destroy({
    where: {
      id: id,
    },
  });
  res.json(prd);
});

module.exports = router;
