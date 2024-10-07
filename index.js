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

app.post("/checkout-credit-card", async (req, res, next) => {
  console.log(req.body);

  await createCharge(req.body, res, next);
});

const createCharge = async (body, res, next) => {
  const { email, name, amount, token } = body;
  try {
    const customer = await omise.customers.create({
      email,
      description: name,
      card: token,
    });

    const charge = await omise.charges.create({
      amount,
      currency: "thb",
      customer: customer.id,
    });

    console.log(charge);

    res.status(200).json({
      message: "Charge created successfully",
      amount: charge.amount,
      status: charge.status,
    });

    next();
  } catch (error) {
    console.error("Error creating charge:", error);

    res.status(500).json({
      message: "Error creating charge",
      error: error.message,
    });
  }
};

app.listen(80, () => {
  console.log("Server is up");
});
