import mongoose from "mongoose";
import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import multer from "multer";
import session from "express-session";
import stripe from "stripe";
const stripeInstance = stripe(
  "sk_test_51OWYPOJD4X8VwIlFsHNv2IqLQUZzCNgGoYpuJXc5EpzVxOD0Scx4FN4BXoqL5ag1gDkMEW0kMo3IlJgeMvcUsepU00gsDklxBu"
);
import {
  Alluniversity,
  CreateUniversity,
  DeleteUniversity,
  UpdateUniversity,
  testdel,
} from "./controllers/University.js";
import {
  CreateDepartment,
  DelDepartment,
  GetDepartment,
  GetDepartmentByUniversityId,
  UpdatedDepartment,
} from "./controllers/Department.js";
import {
  DeleteProduct,
  GetProductDetails,
  UpdateProduct,
  createproduct,
  getProductsbyDepId,
} from "./controllers/Product.js";
import { Register, login } from "./controllers/User.js";
import {
  facebookAuth,
  facebookAuthCallback,
  facebookAuthCallbackHandler,
  googleAuth,
  googleAuthCallback,
  googleAuthCallbackHandler,
  logoutuser,
  verifyToken,
} from "./controllers/Auth.js";
import fs from "fs";
import { fileURLToPath } from "url";
import { dirname, join } from "path";
import passport from "passport";
import cookieSession from "cookie-session";
//const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
import {
  additemsincart,
  getCartItems,
  removeCartItems,
} from "./controllers/Cart.js";
import { createSummary } from "./controllers/Summary.js";

dotenv.config();
const app = express();
app.use(
  cors({
    origin: "http://localhost:3000",
    methods: "GET,POST,PUT,DELETE",
    credentials: true,
  })
);
app.use(express.json());

// //session
app.use(
  session({
    secret: "ThismysecretkeyforSessionThismysecretkeyforSession",
    resave: false,
    saveUninitialized: false,
  })
);
app.use(passport.initialize());
app.use(passport.session());
//stripe
// router.post("/create-checkout-session", async (req, res) => {
//   const { products } = req.body;
//   const lineItems = products.map((product) => ({
//     price_data: {
//       currency: "usd",
//       product_data: {
//         name: product.name,
//         images: [product.image],
//       },
//       unit_amount: Math.round(product.price * 100),
//     },
//     quantity: product.qty,
//   }));
//   const session = await stripe.checkout.session.create({
//     Payment_method_types: ["card"],
//     line_items: lineItems,
//     mode: "payment",
//     success_url: "http://localhost:3000/login",
//     cancel_url: "http://localhost:3000/register",
//   });
//   res.json({ id: session.id });
// });
//jwt
app.post('/create-checkout-session', async (req, res) => {
  try {
    // Create a Checkout session with Stripe
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: 'Your Product Name',
              // Add more product details as needed
            },
            unit_amount: 1000, // Amount in cents (e.g., $10.00)
          },
          quantity: 1, // Adjust quantity as needed
        },
      ],
      mode: 'payment',
      success_url: 'http://localhost:3000/success', // URL to redirect after successful payment
      cancel_url: 'http://localhost:3000/cancel', // URL to redirect if payment is canceled
    });

    // Send the session ID back to the frontend
    res.json({ sessionId: session.id });
  } catch (error) {
    console.error('Error creating Checkout session:', error);
    res.status(500).json({ error: 'Failed to create Checkout session' });
  }
});
app.post("/verify", verifyToken, (req, res) => {
  res.status(200).send({ message: "Token Verified!", userId: req.userId });
});
app.route("/chat",)
//google
app.get("/auth/google", googleAuth);
app.get("/auth/google/callback", googleAuthCallback, googleAuthCallbackHandler);
//facebook
app.get("/auth/facebook", facebookAuth);
app.get(
  "/auth/facebook/callback",
  facebookAuthCallback,
  facebookAuthCallbackHandler
);
//logout
app.get("/logout", logoutuser);

const storageUniv = multer.diskStorage({
  destination: "uploadUniv",
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}--${file.originalname}`);
  },
});
const uploadUniv = multer({
  storage: storageUniv,
});
//university module
app.post("/university", uploadUniv.single("image"), CreateUniversity);
app.put("/university", uploadUniv.single("image"), UpdateUniversity);
app.delete("/university", DeleteUniversity);
app.get("/university", Alluniversity);
//Department module
const storageDep = multer.diskStorage({
  destination: "uploadDep",
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}--${file.originalname}`);
  },
});
const uploadDep = multer({
  storage: storageDep,
});
app.post("/department", uploadDep.single("image"), CreateDepartment);
app.delete("/deparment", DelDepartment);
app.put("/department", uploadDep.single("image"), UpdatedDepartment);
app.get("/department", GetDepartmentByUniversityId);
//products
const storageProduct = multer.diskStorage({
  destination: "uploadProducts/",
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}--${file.originalname}`);
  },
});
const uploadProducts = multer({
  storage: storageProduct,
});
app.post("/product", uploadProducts.array("images"), createproduct);
app.put("/product", uploadProducts.array("images"), UpdateProduct);
app.delete("/product", DeleteProduct);
app.get("/product", getProductsbyDepId);
app.get("/productdetail", GetProductDetails);

//login
app.post("/register", Register);
app.post("/login", login);
//cart
app.get("/cart", getCartItems);
app.post("/cart", additemsincart);
app.delete("/cart", removeCartItems);
//test
app.get("/test", testdel);
//summary
app.post("/summary", createSummary);
//static paths
app.use(express.static("uploadUniv/"));
app.use(express.static("uploadDep/"));
app.use(express.static("uploadProducts/"));

app.get("/", (req, res) => {
  res.send("No Route found!");
});

mongoose
  .connect(process.env.DB_URL)
  .then((d) => {
    console.log("database connected successfully!");
    app.listen(process.env.PORT, () => {
      console.log("Server running at port:" + process.env.PORT);
    });
  })
  .catch((e) => {
    console.log("database connection error!");
  });
