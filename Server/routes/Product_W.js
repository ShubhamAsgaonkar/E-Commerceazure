const express = require("express");
const router = express.Router();
const { Womenware } = require("../models");

router.get("/", async (req, res) => {
  const prd = await Womenware.findAll();
  res.json(prd);
});

router.get("/byid/:id", async (req, res) => {
  const id = req.params.id;
  const prd = await Womenware.findByPk(id);
  res.json(prd);
});

router.post("/update/:id", async (req, res) =>{
  const id = req.params.id;
  const prd = await Womenware.update(req.body, {
    where: {
      id: id,
      },
    });
  res.json(prd);
})

router.delete("/delete/:id", async (req, res) => {
  const id = req.params.id;
  const prd = await Womenware.destroy({
    where: {
      id: id,
    },
  });
  res.json(prd);
});

module.exports = router;
