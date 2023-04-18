import { Product } from "../models/productModel.js";

// return all products in the database
const getAllProducts = async () => {

    const products = await Product.find();

    // determine the number of results being returned
    const count = await Product.countDocuments({})

    return {products, count};
};

// retrieve products from the database with pagination
// both page and limit need to be integers
const getPaginatedProducts = async (page, limit) => {
    const products = await Product.find().skip(page * limit)
                                         .limit(limit);

    console.log(products);

    // determine the number of results being returned
    const count = await Product.countDocuments({})

    return {products, count};
};

const getPaginatedCategories = async (page, limit, userCategory) => {
    const products = await Product.find({ category: { $eq: userCategory } }).skip(page * limit)
                                           .limit(limit);

    console.log(`filtered products by ${userCategory} : ` + products); 

    // determine the number of results being returned
    const count = await Product.countDocuments({ category: { $eq: userCategory } });

    return {products, count};
}

const addProduct = async (product) => {
    const newProduct = new Product(product);
    console.log(newProduct)
    await newProduct.save();
    return newProduct;
};

const getProductsMatchingSearchTerm = async (searchTerm, page, limit ) => {
    // { "authors": { "$regex": "Alex", "$options": "i" } }
    const products = await Product.find({ name: { $regex: searchTerm, $options: "i" } }).skip(page * limit)
                                                                            .limit(limit);

    console.log('products match search query' + products);

    // determine the number of results being returned
    const count = await Product.countDocuments({ name: { $regex: searchTerm, $options: "i" } });

    return {products, count};
}   

const getProductById = async (id) => {
    return await Product.findById(id);
}


export {
    getAllProducts,
    getPaginatedProducts,
    addProduct,
    getPaginatedCategories,
    getProductsMatchingSearchTerm,
    getProductById
};