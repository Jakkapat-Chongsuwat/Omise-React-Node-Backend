const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
require("dotenv").config();

var omise = require("omise")({
  publicKey: process.env.OMISE_PUBLIC_KEY,
  secretKey: process.env.OMISE_SECRET_KEY,
});

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

app.post("/checkout-credt-card", async (req, res, next) => {
  console.log(req.body);

  // createCharge();
});

const createCharge = async () => {
  try {
    const customer = await omise.customers.create({
      email: "john.doe@example.com",
      description: "John Doe (id: 30)",
      card: "tokn_test_61bp0ne4sijy7mwncli",
    });

    const charge = await omise.charges.create({
      amount: 100000,
      currency: "thb",
      customer: customer.id,
    });

    console.log(charge);

    next();
  } catch (error) {
    console.error("Error creating charge:", error);
  }
};

app.listen(80, () => {
  console.log("Server is up");
});
