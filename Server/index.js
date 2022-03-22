//imports
const express = require("express");
require("dotenv").config();
const app = express();
const db = require("./models");
const cors = require("cors");
const razorpay = require("razorpay");

const instance = new razorpay({
  key_id: "rzp_test_n7mL4hR33brspJ",
  key_secret: "Y7qkcOhMK1bO0vN5OidMk0FC",
});

//middleware
app.use(express.json({ limit: "50mb" }));

app.use(cors());

//Routes

const postRouter = require("./routes/Register");
app.use("/post", postRouter);

const getRouter = require("./routes/Login");
app.use("/get", getRouter);

const getmenProduct = require("./routes/Product_M");
app.use("/menware", getmenProduct);

const postProduct = require("./routes/AddProduct");
app.use("/product", postProduct);

const AddProduct = require("./routes/AddToCart");
app.use("/cart", AddProduct);

const order = require("./routes/Order");
app.use("/order", order);

const customizer = require("./routes/Customizer");
app.use("/customizer", customizer);

app.post("/payment", async (req, res) => {
  let status;
  try {
    const { product } = req.body;
    console.log("product");
    const amount = 1000 * 100;
    const currency = "INR";
    const receipt = product.id;
    const notes = { desc: "Test Transaction" };

    instance.orders.create({ amount, currency, receipt, notes }),
      (err, order) => {
        if (error) {
          return res.status(500).json({ err });
        }
        return res.status(200).json({ order });
      };
    status = product;
  } catch (err) {
    console.log(err);
    status = "failure";
  }
  res.json(status);
});

db.sequelize.sync().then(() => {
  app.listen(3002, () => {
    console.log("server running");
  });
});
