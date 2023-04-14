import express from "express";
import mongoose from 'mongoose';
import {
    getAllProducts,
    getPaginatedProducts,
    addProduct,
    getPaginatedCategories,
    getProductsMatchingSearchTerm,
    getProductById
} from '../dao/product-dao.js';

import {
  ReasonPhrases,
  StatusCodes,
} from "http-status-codes";

const productRouter = new express.Router();

// endpoint 1: GET - paginated products
productRouter.get("/products/:page/:limit", async (req, res) => {
    // retrieving the path params
    const page = parseInt(req.params.page) - 1;
    const limit = parseInt(req.params.limit);

    console.log("line 21, PAGE: " + page + " lIMIT: " + limit)

    const {products,count} = await getPaginatedProducts(page,limit);

    return res.status(StatusCodes.OK)
              .header('Count',count)
              .json(products);
});

// endpoint 2: POST - adding product
productRouter.post('/products', async (req,res) => {
    const newProduct = await addProduct(req.body);

    return res.status(StatusCodes.CREATED)
              .header('Location', `/products/${newProduct._id}`)
              .json(newProduct);
});

// endpoint 3: GET all products without worrying about pagination
productRouter.get("/products", async (req, res) => {
    const {products,count} = await getAllProducts();

    return res.status(StatusCodes.OK)
              .header('Count',count)
              .json(products); 
});

// endpoint 4: GET filter by category
// query param ?category=<category>
productRouter.get("/products/:page/:limit/filter", async (req, res) => {
    // retrieving the path params
    const page = parseInt(req.params.page) - 1;
    const limit = parseInt(req.params.limit);

    // retrieve the category query param 
    const category = req.query.category;
    
    // logging in console
    console.log("line 21, PAGE: " + page + " lIMIT: " + limit + " category: " + category)
  
    const {products,count} = await getPaginatedCategories(page,limit,category);
  
    return res.status(StatusCodes.OK)
              .header('Count',count)
              .json(products);
});

// endpoint 5: GET product by 
// query param ?search=<search>
// search only works for product.name
productRouter.get("/products/:page/:limit/search", async (req, res) => {
    // retrieving the path params
    const page = parseInt(req.params.page) - 1;
    const limit = parseInt(req.params.limit);

    // retrieve the category query param 
    const search = req.query.search;
    
    // logging in console
    console.log("line 21, PAGE: " + page + " lIMIT: " + limit + " search phrase: " + search)
    
    // retrieve the products and the count
    const {products,count} = await getProductsMatchingSearchTerm(search,page,limit);
    
    return res.status(StatusCodes.OK)
              .header('Count',count)
              .json(products);
});

// endpoint 6: GET single product by id
productRouter.get("/products/:id", async (req, res) => {

    // retrieving the path params
    const id = req.params.id;
    
    // check if the id is actually valid
    const isValid = mongoose.isValidObjectId(id);
    console.log(isValid)
    if (!isValid){
        return res.sendStatus(StatusCodes.BAD_REQUEST);
    }
  
    const product = await getProductById(id);
  
    return res.status(StatusCodes.OK)
              .json(product);
});

export default productRouter;
