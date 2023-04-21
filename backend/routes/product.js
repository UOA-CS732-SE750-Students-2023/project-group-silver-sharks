import express from "express";
import mongoose from "mongoose";
import {
  getAllProducts,
  getPaginatedProducts,
  addProduct,
  getPaginatedCategories,
  getProductsMatchingSearchTerm,
  getProductById,
} from "../dao/product-dao.js";

import { ReasonPhrases, StatusCodes } from "http-status-codes";

const productRouter = new express.Router();

// endpoint 1: GET - paginated products
productRouter.get("/products", async (req, res) => {
  // retrieving the query params
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const sortBy = req.query.sortBy || "default";
  try {
    const { products, count } = await getPaginatedProducts(page, limit, sortBy);

    if (count == 0) {
      return res.status(StatusCodes.NOT_FOUND).send("No Products Were Found");
    }

    return res.status(StatusCodes.OK).json([products,count]);
  } catch (error) {
    console.error(error.message);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send("Server Error");
  }
});

// endpoint 2: POST - adding product
productRouter.post("/products", async (req, res) => {
  try {
    const newProduct = await addProduct(req.body);

    return res
      .status(StatusCodes.CREATED)
      .header("Location", `/products/${newProduct._id}`)
      .json(newProduct);
  } catch (error) {
    console.log(error);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send("Server Error");
  }
});

// // endpoint 3: GET all products without worrying about pagination
// productRouter.get("/products", async (req, res) => {
//   const { products, count } = await getAllProducts();

//   return res.status(StatusCodes.OK).header("Count", count).json(products);
// });

// endpoint 4: GET filter by category
// query param ?category=<category>&page=<page>&limit=<limit>
productRouter.get("/products/filter", async (req, res) => {
  // retrieving query params
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

    if (count == 0) {
      return res.status(StatusCodes.NOT_FOUND).send("No Products Were Found");
    }

    return res.status(StatusCodes.OK).header("Count", count).json(products);
  } catch (error) {
    console.log(error);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send("Server Error");
  }
});

// endpoint 5: GET product by
// query param ?search=<search>&page=<page>&limit=<limit>
// search only works for product.name
productRouter.get("/products/search", async (req, res) => {
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

    return res.status(StatusCodes.OK).header("Count", count).json(products);
  } catch (error) {
    console.log(error);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).send("Server Error");
  }
});

// endpoint 6: GET single product by id
productRouter.get("/products/:id", async (req, res) => {
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

    return res.status(StatusCodes.OK).json(product);
  } catch (error) {
    console.log(error);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).send("Server Error");
  }
});

export default productRouter;
