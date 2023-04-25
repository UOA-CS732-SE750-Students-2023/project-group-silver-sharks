import express from "express";
import {
  getAllAccounts,
  getAccountById,
  deleteAccount,
  getPurchasedProductsById,
  getSellingProductsById,
  getCartContents,
} from "../dao/account-dao.js";


import { ReasonPhrases, StatusCodes } from "http-status-codes";
import passport from "passport";
import session from "express-session";
import { Account } from "../models/accountModel.js";
import { Product } from "../models/productModel.js";

const accountRouter = new express.Router();

// Middle-ware function to ensure user is admin
function isAdmin(req, res, next) {
  const user = req.user;
  if (user && user.accountType === "admin") {
    next();
  } else {
    res.status(401).json({ message: "You need to be an admin for this" });
  }
}

// Middle-ware function to ensure authentication of endpoints
function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) {
    if (req.user.username) {
      return next();
    } else {
      return res.status(428).send({
        message: `Please select a username ${req.user._id}`,
        id: req.user._id,
      });
    }
  } else {

    return res.status(401).send({ message: "Unauthorizedd" });
  }
}

accountRouter.use(
  session({ secret: "cats", resave: false, saveUninitialized: true })
);
accountRouter.use(passport.initialize());
accountRouter.use(passport.session());

/**
 * Endpoint 1: POST /account/username
 * Adds a username to an existing account without a username.
 * Request body: username
 */

// if username already exists 410 
// if username is invalid then 409
accountRouter.post("/account/username", async (req, res) => {
  try {
    const { username } = req.body;
    const alreadyExists = await Account.findOne({ username });
    console.log(req.body.username);
    if (alreadyExists) {
      res.status(410).send("Username already exists");
    } else if (!/^[a-zA-Z0-9_]+$/.test(req.body.username)) {
      res
        .status(409)
        .send(
          "Invalid username - only numbers, letters and underscores allowed"
        );
    } else {
      const user = await Account.findById(req.user._id);
      user.username = req.body.username;
      await user.save();
      res.send({ message: "Username added successfully" });
    }
  } catch (err) {
    console.log(err);
    res
      .status(500)
      .send({ message: "Unable to add username: ensure you are logged in" });
  }
});

/**
 * Endpoint 2: GET /account
 * Gets all accounts.
 */
accountRouter.get("/account", isLoggedIn, async (req, res) => {
  const { accounts, count } = await getAllAccounts();
  return res.status(StatusCodes.OK).header("Count", count).json(accounts);
});

/**
 * Endpoint 3: GET /account/id/{id}
 * Get account by id.
 * 
 * // passing in 0 returns the current user
 */
accountRouter.get("/account/id/:id", isLoggedIn, async (req, res) => {
  const id = req.params.id === "0" ? req.user.id : req.params.id;
  const account = await getAccountById(id);
  return res.status(StatusCodes.OK).json(account);
});

/**
 * Endpoint 4: GET /account/sign-in
 * Opens Google sign-in page.
 */
accountRouter.get(
  "/account/sign-in",
  passport.authenticate("google", { scope: ["email", "profile"] })
);

/**
 * Endpoint 5: GET /account/sign-out
 * Signs user out.
 */
accountRouter.get("/account/sign-out", function (req, res, next) {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    res.redirect("/");
  });
});

/**
 * Endpoint 6 (admin only): PUT /account/id/{id}
 * Edit account info (editable fields are username, fisrtName, lastName and accountType)
 */
accountRouter.put("/account/id/:id", isLoggedIn, isAdmin, async (req, res) => {
  try {
    const accountId = req.params.id;
    const updatedFields = req.body;
    const allowedFields = ["username", "firstName", "lastName", "accountType"];
    const validFields = Object.keys(updatedFields).filter((field) =>
      allowedFields.includes(field)
    );

    if (validFields.length === 0) {
      return res
        .status(400)
        .json({ message: "No valid fields provided for update" });
    }

    if (
      updatedFields.accountType &&
      !["admin", "normal"].includes(updatedFields.accountType)
    ) {
      return res.status(400).json({ message: "Invalid value for accountType" });
    }

    const updatedAccount = await Account.findByIdAndUpdate(
      accountId,
      { $set: updatedFields },
      { new: true }
    ).select(allowedFields.join(" "));

    res.status(200).json(updatedAccount);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

/**
 * Endpoint 7: DELETE /account
 * Delete your own account
 */
accountRouter.delete("/account", isLoggedIn, async (req, res) => {
  await deleteAccount(req.user.id);
  return res.json({ message: 'Account deleted successfully' });
});

/**
 * Endpoint 8 (admin only): DELETE /account/id/{id}
 * Delete another account
 */
accountRouter.delete(
  "/account/id/:id",
  isLoggedIn,
  isAdmin,
  async (req, res) => {
    await deleteAccount(req.params.id);
    return res.json({
      message: "Account of user " + req.params.id + " deleted successfully",
    });
  }
);

/**
 * Endpoint 9: GET /account/id/{id}/purchased
 * Get user's purchased items
 */
accountRouter.get("/account/id/:id/purchased", isLoggedIn, async (req, res) => {
  try {
    const id = req.params.id === "0" ? req.user.id : req.params.id;
    const purchasedProducts = await getPurchasedProductsById(id);
    return res.json({ purchasedProducts });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Account not found" });
  }
});

/**
 * Endpoint 10: GET /account/id/{id}/selling
 * Get user's selling items
 * path param: user id
 */
accountRouter.get("/account/id/:id/selling", isLoggedIn, async (req, res) => {
  try {
    const id = req.params.id === "0" ? req.user.id : req.params.id;
    const sellingProducts = await getSellingProductsById(id);
    return res.json({ sellingProducts });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Account not found" });
  }
});

/**
 * Endpoint 11: GET /account/cart
 * Get user's cart contents
 */
accountRouter.get("/account/cart", async (req, res) => {
  try {
    const cartContents = await getCartContents(req.user.id);
    return res.json({ cartContents });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Account not found" });
  }
});

/**
 * Endpoint 12: GET /account/cart/pid/{pid}
 * Add an item to cart
 */
accountRouter.post("/account/cart/pid/:pid", async (req, res) => {
  const productId = req.params.pid
  //const userId = req.user.id;
  const userId = '118069059652555688591';
  
  try {
    // Check if the product exists
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    // Check if the user exists
    const account = await Account.findById(userId);
    if (!account) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Check if the product is already in the user's cart
    const productInCart = account.cartContents.find(item => item.product.toString() === productId);
    if (productInCart) {
      return res.status(400).json({ message: 'Product is already in cart' });
    }

    // Add the product to the user's cartContents
    account.cartContents.push({ product: productId });
    await account.save();

    res.status(200).json({ message: 'Product added to cart' });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Server error: product id may be invalid' });
  }
});

export default accountRouter;
