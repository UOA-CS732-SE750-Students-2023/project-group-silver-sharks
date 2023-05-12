import express from "express";
import mongoose from "mongoose";
import {
  getPaginatedProducts,
  addProduct,
  getPaginatedCategories,
  getProductsMatchingSearchTerm,
  getProductById,
  updateProduct,
  deleteProduct,
  registerProductWithAccount,
  registerBuyingProductWithAccount,
  sendSharkbotMessage,
  getLandingPageProducts,
} from "../dao/product-dao.js";

import { registerAccountWithProduct } from "../dao/account-dao.js";

import { StatusCodes } from "http-status-codes";
import { Product } from "../models/productModel.js";
import { ProductReview } from "../models/productReviewModel.js";
import passport from "passport";
import session from "express-session";
import { Account } from "../models/accountModel.js";

const productRouter = new express.Router();

/**
 * 1. GET - Gets three most popular media from each category
 */
productRouter.get("/products/landing-page", async (req, res) => {
  try {
    const products = await getLandingPageProducts();
    return res.status(StatusCodes.OK).json(products);
  } catch (err) {
    console.error(err);
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: "Error getting products for landing page" });
  }
});

// Middle-ware function to ensure authentication of endpoints
function isLoggedIn(req, res, next) {
  if (process.env.NODE_ENV === "backend-test") {
    req.user = {
      _id: req.header("x-user-id"),
      productsPurchased: [
        { _id: "000000000000000000000001" },
        { _id: "000000000000000000000002" },
        { _id: "000000000000000000000003" },
      ],
    };
    return next();
  }
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

/**
 * Endpoint 2: GET - Paginated products regardless of category
 * Query Params: Page, Limit, and SortBy
 */
productRouter.get("/products", isLoggedIn, async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const sortBy = req.query.sortBy || "default";

  try {
    const { products, count } = await getPaginatedProducts(page, limit, sortBy);

    if (count === 0) {
      return res.status(StatusCodes.NOT_FOUND).send("No Products Were Found");
    }

    return res.status(StatusCodes.OK).json([products, count]);
  } catch (error) {
    console.error(error.message);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send("Server Error");
  }
});

/**
 * Endpoint 3: POST - Add product to sell
 * Request Body: Product data in JSON format
 * Path Params: UserID
 */
productRouter.post("/products/sell/:userId", isLoggedIn, async (req, res) => {
  const userId = req.params.userId;
  const product = req.body;

  try {
    // create the account
    const newProduct = await addProduct(product);

    // register the product with the account
    await registerProductWithAccount(newProduct, userId);

    // register the account with the product
    await registerAccountWithProduct(userId, newProduct._id);

    return res
      .status(StatusCodes.CREATED)
      .header("Location", `/products/${newProduct._id}`)
      .json(newProduct);
  } catch (error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send("Server Error");
  }
});

/**
 * Endpoint 4: PUT - Edit product details
 * Request Body: Details to replace in JSON format
 */
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
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send("Server Error");
  }
});

/**
 * Endpoint 5: GET - Get paginated products filtered by category
 * Query Params: Page, Limit, Category, SortBy
 */
productRouter.get("/products/filter", isLoggedIn, async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const category = req.query.category;
  const sortBy = req.query.sortBy || "default";

  try {
    const { products, count } = await getPaginatedCategories(
      page,
      limit,
      category,
      sortBy
    );

    if (count === 0) {
      return res.status(StatusCodes.NOT_FOUND).send("No Products Were Found");
    }

    return res.status(StatusCodes.OK).json([products, count]);
  } catch (error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send("Server Error");
  }
});

/**
 * Endpoint 6: GET - Get products matching search term
 * Query Params: Page, Limit, Search, SortBy
 */
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
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).send("Server Error");
  }
});

/**
 * Endpoint 7: GET - Get single product by ID
 * Path Params: ProductID
 */
productRouter.get("/products/:id", isLoggedIn, async (req, res) => {
  // retrieving the path params
  const id = req.params.id;

  // check if the id is actually valid
  const isValid = mongoose.isValidObjectId(id);
  if (!isValid) {
    return res.status(StatusCodes.BAD_REQUEST).send("Invalid Product ID");
  }

  try {
    const product = await getProductById(id);

    if (!product) {
      return res.status(StatusCodes.NOT_FOUND).send("Product Not Found");
    }

    return res.status(StatusCodes.OK).json(product);
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).send("Server Error");
  }
});

/**
 * Endpoint 8: DELETE - Remove a product
 * Path Params: ProductID
 */
productRouter.delete("/products/:productId", isLoggedIn, async (req, res) => {
  try {
    const productId = req.params.productId;

    const deletedProduct = await deleteProduct(productId);

    if (!deletedProduct) {
      return res.status(StatusCodes.NOT_FOUND).send("Product Not Found");
    }

    // delete all reviews for product
    await ProductReview.deleteMany({ product: productId });

    // delete product from account's purchased products
    try {
      const result = await Account.updateMany(
        { productsPurchased: { $in: [productId] } },
        { $pull: { productsPurchased: productId } }
      );
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
    }
  } catch (error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send("Server Error");
  }
});

/**
 * Endpoint 9: POST - Buy products
 * Request Body: List of products being bought
 * Query Params: AccountID
 */
productRouter.post("/products/buy/", isLoggedIn, async (req, res) => {
  try {
    const accountId = req.query.accountId;
    const products = req.body;

    for (const product of products) {
      const productId = product._id;
      await registerBuyingProductWithAccount(productId, accountId);
      if (process.env.NODE_ENV !== "backend-test") {
        await sendSharkbotMessage(product.author, productId, req.user.id);
      }
    }

    return res
      .status(StatusCodes.OK)
      .json({ message: "Successfully bought product" });
  } catch (err) {
    console.error(err);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send("Server Error");
  }
});

/**
 * Endpoint 10: GET - Gets reviews for a specific product
 * Path Params: ProductID
 */
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

/**
 * Endpoint 11: POST - Add review for a specific product
 * Request Body: Review data in JSON format
 * Path Params: ProductID
 */
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
        (review) => String(review.account) === String(req.user._id)
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
        account: req.user._id,
      });

      await review.save();

      product.reviews.push(review);

      let reviewsCount = product.reviews.length;

      // Calculate new average rating
      if (
        product.averageRating !== null &&
        product.averageRating !== undefined
      ) {
        let oldAverage = parseFloat(product.averageRating.toString());
        let newAverage =
          (oldAverage * (reviewsCount - 1) + rating) / reviewsCount;
        product.averageRating = mongoose.Types.Decimal128.fromString(
          newAverage.toString()
        );
      } else {
        product.averageRating = mongoose.Types.Decimal128.fromString(
          rating.toString()
        );
      }

      await product.save();

      return res.json(review);
    } catch (err) {
      return res.status(500).json({ error: "Invalid ID" });
    }
  }
);

/**
 * Endpoint 12: GET - Check if an account is eligible to review a product
 * Path Params: ProductID
 */
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
        (review) => String(review.account) === String(req.user._id)
      );
      if (!purchasedProductIds.includes(String(productId))) {
        res.status(401).send(false);
      } else if (existingReview) {
        res.status(401).send(false);
      } else {
        res.status(200).send(true);
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
