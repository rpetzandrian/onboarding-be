const bodyParser = require("body-parser");
const express = require("express");
const db = require("./helpers/connection_db");
const Product = require("./models/product");
const app = express();
require("dotenv").config();
const cors = require("cors");
const { HOST, PORT } = process.env;
let whitelist = ["http://localhost:3000"];
let corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
};
app.use(cors(corsOptions));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

db.sync();

app.get("/", async (req, res) => {
  try {
    const product = await Product.findAll();
    res.send({
      message: "Get product success",
      code: 201,
      data: product,
    });
  } catch (err) {
    res.status(500).send({
      message: "Get product error",
      code: 500,
      error: err.message,
    });
  }
});

app.post("/", async (req, res) => {
  try {
    await Product.create(req.body);
    res.send({
      message: "Add product success",
      code: 201,
    });
  } catch (err) {
    res.status(500).send({
      message: "Add product error",
      code: 500,
      error: err.message,
    });
  }
});

app.patch("/:id", async (req, res) => {
  try {
    await Product.update(req.body, { where: { id: req.params.id } });
    res.send({
      message: "Update product success",
      code: 200,
    });
  } catch (err) {
    res.status(500).send({
      message: "Update product error",
      code: 500,
      error: err.message,
    });
  }
});

app.delete("/:id", async (req, res) => {
  try {
    await Product.destroy({ where: { id: req.params.id } });
    res.send({
      message: "Delete product success",
      code: 200,
    });
  } catch (err) {
    res.status(500).send({
      message: "Delete product error",
      code: 500,
      error: err.message,
    });
  }
});

app.listen(PORT, () => {
  console.log(`Example app listening at http://${HOST}:${PORT}`);
});
