import express from "express";
import mongoose from "mongoose";
import Redis from "redis";
import {
  getAllProducts,
  getPaginatedProducts,
  addProduct,
  getPaginatedCategories,
  getProductsMatchingSearchTerm,
  getProductById,
  updateProduct,
  deleteProduct,
  registerProductWithAccount,
  registerBuyingProductWithAccount,
} from "../dao/product-dao.js";

import { registerAccountWithProduct } from "../dao/account-dao.js";

import { ReasonPhrases, StatusCodes } from "http-status-codes";
import { Product } from "../models/productModel.js";
import { ProductReview } from "../models/productReviewModel.js";
import passport from "passport";
import session from "express-session";
import { Account } from "../models/accountModel.js";

const productRouter = new express.Router();

const redisClient = Redis.createClient();
redisClient.connect();

const DEFAULT_EXPIRATION = 3600;

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

productRouter.use(
  session({ secret: "cats", resave: false, saveUninitialized: true })
);
productRouter.use(passport.initialize());
productRouter.use(passport.session());

// endpoint 1: GET - paginated products
productRouter.get("/products", isLoggedIn, async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const sortBy = req.query.sortBy || "default";
  console.log("Getting paginated products!");

  // Create a cache key for the request
  const cacheKey = `products:${page}:${limit}:${sortBy}`;

  try {
    // Check if the cache key exists in Redis
    const cachedResult = await redisClient.get(cacheKey);

    if (cachedResult) {
      console.log("Getting cached results");
      // If the cache key exists, return the cached result
      return res.status(StatusCodes.OK).send(cachedResult);
    } else {
      console.log("Getting new results");
      // If the cache key doesn't exist, get the data and cache it
      const { products, count } = await getPaginatedProducts(
        page,
        limit,
        sortBy
      );

      if (count === 0) {
        return res.status(StatusCodes.NOT_FOUND).send("No Products Were Found");
      }

      // Store the result in Redis with a 1-hour expiration time (3600 seconds)
      await redisClient.setEx(
        cacheKey,
        DEFAULT_EXPIRATION,
        JSON.stringify([products, count])
      );
      console.log("Successfully cached results");
      // await redisClient.setAsync(
      //   cacheKey,
      //   JSON.stringify([products, count]),
      //   "EX",
      //   3600
      // );

      return res.status(StatusCodes.OK).json([products, count]);
    }
  } catch (error) {
    console.error(error.message);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send("Server Error");
  }
});

// endpoint 2: POST - adding product
// NOTE: the product needs to be registered with a user
// path param userId
productRouter.post("/products/sell/:userId", isLoggedIn, async (req, res) => {
  const userId = req.params.userId;
  const product = req.body;

  try {
    // create the account
    const newProduct = await addProduct(product);

    // register the product with the account
    await registerProductWithAccount(newProduct, userId);

    console.log(userId);

    // register the account with the product
    await registerAccountWithProduct(userId, newProduct._id);

    return res
      .status(StatusCodes.CREATED)
      .header("Location", `/products/${newProduct._id}`)
      .json(newProduct);
  } catch (error) {
    console.log(error);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send("Server Error");
  }
});

// endpoint 3: PUT - editing product
productRouter.put("/products/:productId", isLoggedIn, async (req, res) => {
  try {
    const productId = req.params.productId;
    const updatedProductData = req.body;

    const updatedProduct = await updateProduct(productId, updatedProductData);

    if (updatedProduct) {
      return res.status(StatusCodes.OK).json(updatedProduct);
    } else {
      return res.status(StatusCodes.NOT_FOUND).send("Product not found");
    }
  } catch (error) {
    console.log(error);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send("Server Error");
  }
});

// endpoint 4: GET filter by category
// query param ?category=<category>&page=<page>&limit=<limit>
productRouter.get("/products/filter", isLoggedIn, async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const category = req.query.category;
  const sortBy = req.query.sortBy || "default";

  // Create a cache key for the request
  const cacheKey = `products:filter:${page}:${limit}:${category}:${sortBy}`;

  try {
    // Check if the cache key exists in Redis
    const cachedResult = await redisClient.get(cacheKey);

    if (cachedResult) {
      console.log("Getting cached results");
      // If the cache key exists, return the cached result
      return res.status(StatusCodes.OK).send(cachedResult);
    } else {
      console.log("Getting new results and caching them");
      // If the cache key doesn't exist, get the data and cache it
      const { products, count } = await getPaginatedCategories(
        page,
        limit,
        category,
        sortBy
      );

      if (count === 0) {
        return res.status(StatusCodes.NOT_FOUND).send("No Products Were Found");
      }

      // Store the result in Redis with a 1-hour expiration time (3600 seconds)
      await redisClient.setEx(
        cacheKey,
        DEFAULT_EXPIRATION,
        JSON.stringify([products, count])
      );
      console.log("Successfully cached results");
      // await req.redisClient.setAsync(
      //   cacheKey,
      //   JSON.stringify([products, count]),
      //   "EX",
      //   3600
      // );

      return res.status(StatusCodes.OK).json([products, count]);
    }
  } catch (error) {
    console.log(error);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send("Server Error");
  }
});

// endpoint 5: GET product by
// query param ?search=<search>&page=<page>&limit=<limit>
// search only works for product.name
productRouter.get("/products/search", isLoggedIn, async (req, res) => {
  // retrieving the query params
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const search = req.query.search;
  const sortBy = req.query.sortBy || "default";

  try {
    // retrieve the products and the count
    const { products, count } = await getProductsMatchingSearchTerm(
      search,
      page,
      limit,
      sortBy
    );

    if (count == 0) {
      return res.status(StatusCodes.NOT_FOUND).send("No Products Were Found");
    }

    return res.status(StatusCodes.OK).json([products, count]);
  } catch (error) {
    console.log(error);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).send("Server Error");
  }
});

// endpoint 6: GET single product by id
productRouter.get("/products/:id", isLoggedIn, async (req, res) => {
  // retrieving the path params
  const id = req.params.id;

  // check if the id is actually valid
  const isValid = mongoose.isValidObjectId(id);
  console.log(isValid);
  if (!isValid) {
    return res.sendStatus(StatusCodes.BAD_REQUEST);
  }

  try {
    const product = await getProductById(id);

    console.log(product);

    return res.status(StatusCodes.OK).json(product);
  } catch (error) {
    console.log(error);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).send("Server Error");
  }
});

// endpoint 7: DELETE - removing a product
productRouter.delete("/products/:productId", isLoggedIn, async (req, res) => {
  try {
    const productId = req.params.productId;

    const deletedProduct = await deleteProduct(productId);

    // delete all reviews for product
    ProductReview.deleteMany({ product: productId });

    // delete product from account's purchased products
    try {
      const result = await Account.updateMany(
        { productsPurchased: { $in: [productId] } },
        { $pull: { productsPurchased: productId } }
      );
      console.log(`Removed product ${productId} from all accounts.`);
    } catch (error) {
      console.error(
        "Error while removing product from purchased products:",
        error
      );
    }

    // delete products from account's selling products
    try {
      const result = await Account.updateMany(
        { sellingProducts: { $in: [productId] } },
        { $pull: { sellingProducts: productId } }
      );
      console.log(`Removed product ${productId} from all accounts.`);
    } catch (error) {
      console.error(
        "Error while removing product from selling products:",
        error
      );
    }

    if (deletedProduct) {
      return res
        .status(StatusCodes.OK)
        .json({ message: "Product deleted successfully" });
    } else {
      return res.status(StatusCodes.NOT_FOUND).send("Product not found");
    }
  } catch (error) {
    console.log(error);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send("Server Error");
  }
});

// endpoint 8: POST - buy product
productRouter.post("/products/buy/", isLoggedIn, async (req, res) => {
  try {
    // const accountId = req.user._id;
    const accountId = req.query.accountId;
    const products = req.body;

    for (const product of products) {
      const productId = product._id;
      await registerBuyingProductWithAccount(productId, accountId);
    }

    return res
      .status(StatusCodes.OK)
      .json({ message: "Successfully bought product" });
  } catch (err) {
    console.error(err);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send("Server Error");
  }
});

// ENDPOINT: Get Reviews for a specific product
// sorting query param -> ?sortBy=<>
// ur review for the product is always on top
// can only review if it has been purchased by user and can only review once
productRouter.get(
  "/products/pid/:pid/reviews",
  isLoggedIn,
  async (req, res) => {
    try {
      const productId = req.params.pid;
      const product = await Product.findById(productId);

      if (!product) {
        return res.status(404).json({ error: "Product not found" });
      }

      let sortBy = req.query.sortBy || "most_recent";

      const sortOptions = {
        most_recent: { createdAt: -1 },
        highest_rating: { rating: -1 },
        lowest_rating: { rating: 1 },
      };

      const userId = req.user.id;

      let userReview = null;
      let otherReviews = null;

      const allReviews = await ProductReview.find({ product: productId })
        .populate("account")
        .sort(sortOptions[sortBy]);

      if (allReviews && allReviews.length > 0) {
        userReview = allReviews.find((review) => review.account === userId);
        if (userReview) {
          otherReviews = allReviews.filter(
            (review) => review._id !== userReview._id
          );
        } else {
          otherReviews = allReviews;
        }
      }

      const reviews = userReview ? [userReview, ...otherReviews] : allReviews;

      return res.json(reviews);
    } catch (err) {
      console.error(err);
      return res.status(500).json({ error: "Server Error" });
    }
  }
);

// ENDPOINT: Add review for a specific product
productRouter.post(
  "/products/pid/:pid/review",
  isLoggedIn,
  async (req, res) => {
    try {
      const productId = req.params.pid;
      const { text, rating } = req.body;

      if (!Number.isInteger(rating) || rating < 1 || rating > 5) {
        return res.status(400).json({ error: "Invalid rating value" });
      }

      const product = await Product.findById(productId).populate("reviews");
      if (!product) {
        return res.status(404).json({ error: "Product not found" });
      }

      const purchasedProductIds = req.user.productsPurchased.map((p) =>
        String(p._id)
      );
      if (!purchasedProductIds.includes(String(productId))) {
        return res.status(401).json({
          error: "You can only review products that you have purchased",
        });
      }

      const existingReview = product.reviews.find(
        (review) => String(review.account) === String(req.user.id)
      );

      if (existingReview) {
        return res
          .status(400)
          .json({ error: "You already reviewed this product" });
      }

      const review = new ProductReview({
        text,
        rating,
        product: productId,
        account: req.user.id,
      });

      await review.save();

      product.reviews.push(review);

      if (product.averageRating) {
        product.averageRating =
          (product.averageRating * product.reviews.length + rating) /
          (product.reviews.length + 1);
      } else {
        product.averageRating = rating;
      }

      await product.save();

      return res.json(review);
    } catch (err) {
      console.log(err);
      return res.status(500).json({ error: "Invalid ID" });
    }
  }
);

// ENDPOINT: Delete review for a specific product
productRouter.delete(
  "/products/pid/:pid/review",
  isLoggedIn,
  async (req, res) => {
    try {
      const productId = req.params.pid;
      const reviewId = req.body.reviewId;

      const product = await Product.findById(productId).populate("reviews");
      if (!product) {
        return res.status(404).json({ error: "Product not found" });
      }

      const review = await ProductReview.findById(reviewId);
      if (!review) {
        return res.status(404).json({ error: "Review not found" });
      }

      if (
        String(review.account) !== String(req.user.id) &&
        req.user.accountType !== "admin"
      ) {
        return res
          .status(401)
          .json({ error: "You are not authorized to delete this review" });
      }

      const index = product.reviews.findIndex(
        (r) => String(r._id) === String(reviewId)
      );
      if (index >= 0) {
        product.reviews.splice(index, 1);

        if (product.reviews.length > 0) {
          product.averageRating =
            product.reviews.reduce((sum, r) => sum + r.rating, 0) /
            product.reviews.length;
        } else {
          product.averageRating = null;
        }

        await product.save();
      }

      console.log(review);
      await ProductReview.findOneAndDelete({ _id: reviewId });

      return res.json({ success: true });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ error: "Server Error" });
    }
  }
);

// ENDPOINT: Can add review - true or false
productRouter.get(
  "/products/pid/:pid/can-review",
  isLoggedIn,
  async (req, res) => {
    try {
      const productId = req.params.pid;

      const product = await Product.findById(productId).populate("reviews");
      if (!product) {
        return res.status(404).json({ error: "Product not found" });
      }

      const purchasedProductIds = req.user.productsPurchased.map((p) =>
        String(p._id)
      );
      const existingReview = product.reviews.find(
        (review) => String(review.account) === String(req.user.id)
      );
      if (!purchasedProductIds.includes(String(productId))) {
        res.send(false);
      } else if (existingReview) {
        res.send(false);
      } else {
        res.send(true);
      }
    } catch (err) {
      console.error(err);
      return res
        .status(500)
        .json({ error: "Server Error: Product id is likely invalid" });
    }
  }
);

export default productRouter;
