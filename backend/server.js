const express = require("express");
const app = express();
const cors = require("cors");
const { resolve } = require("path");

const helmet = require("helmet");

app.use(
  helmet.contentSecurityPolicy({
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: ["'self'", "'unsafe-inline'"],
      styleSrc: ["'self'", "'unsafe-inline'"],
      imgSrc: ["'self'"],
      fontSrc: ["'self'"],
      objectSrc: ["'none'"],
      frameSrc: ["'self'", "http://localhost:5252", "http://localhost:3000"],
      upgradeInsecureRequests: [],
    },
  })
);

app.use(express.json());
app.use(cors());

const env = require("dotenv").config({ path: "./.env" });

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

app.use(express.static(process.env.STATIC_DIR));

app.get("/", (req, res) => {
  const path = resolve(process.env.STATIC_DIR + "/index.html");
  res.sendFile(path);
});

app.get("/config", (req, res) => {
  res.send({
    publishableKey: process.env.STRIPE_PUBLISHABLE_KEY,
  });
});

// app.post("/payment", cors(), async (req, res) => {
//   let { amount, id, email } = req.body;

//   try {
//     const payment = await stripe.paymentIntents.create({
//       amount: amount * 100,
//       currency: "INR",
//       description: "Payment",
//       payment_method_types: ["card"],
//       payment_method: id,
//       confirm: true,
//       off_session: true,
//       receipt_email: email,

//     });

//     console.log("Payment", payment);

//     const receipt = await stripe.paymentIntents.sendReceipt(
//       payment.id,
//       { email: payment.receipt_email }
//     );

//     res.json({
//       message: "Payment was successful",
//       success: true,
//     });

//   } catch (error) {
//     console.log("Error", error);
//     res.json({
//       message: "Payment Failed",
//       success: false,
//     });
//   }
// });

app.post("/payment", cors(), async (req, res) => {
  let { amount, id, email } = req.body;

  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount * 100,
      currency: "INR",
      description: "Payment",
      payment_method_types: ["card"],
      payment_method: id,
      confirm: true,
      off_session: true,
      receipt_email: email,
      // receipt_template: "your_receipt_template_id_here",
    });

    console.log("Payment", paymentIntent);

    res.json({
      message: "Payment was successful",
      success: true,
    });
  } catch (error) {
    console.log("Error", error);
    res.json({
      message: "Payment Failed",
      success: false,
    });
  }
});

app.listen(5252, () =>
  console.log(`Node server listening at http://localhost:5252`)
);
