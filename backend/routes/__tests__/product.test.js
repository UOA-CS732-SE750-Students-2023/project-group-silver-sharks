import productRouter from "../product.js";
import mongoose from "mongoose";
import express from "express";
import request from "supertest";
import bodyParser from "body-parser";
import { Product } from "../../models/productModel.js";
import { Account } from "../../models/accountModel.js";
import { ProductReview } from "../../models/productReviewModel.js";

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(productRouter);

// add dummy products
const product1 = {
  _id: new mongoose.Types.ObjectId("000000000000000000000001"),
  category: "Images",
  name: "Pizza",
  description: "Amazing photo of a pizza",
  price: 25,
  amountSold: 5,
  averageRating: 5,
  reviews: ["000000000000000000000100", "000000000000000000000200"],
};

const product2 = {
  _id: new mongoose.Types.ObjectId("000000000000000000000002"),
  category: "Videos",
  name: "Pizza Cooking Video",
  description: "Amazing video of a pizza being cooked",
  price: 15,
  amountSold: 2,
  averageRating: 4,
};

const product3 = {
  _id: new mongoose.Types.ObjectId("000000000000000000000003"),
  category: "Music",
  name: "Pizza Music Video",
  description: "Amazing dancing pizza",
  price: 5,
  amountSold: 4,
  averageRating: 3,
};

const product4 = {
  _id: new mongoose.Types.ObjectId("000000000000000000000004"),
  category: "Services",
  name: "Pizza Delivery",
  description: "Amazing pizza delivered right to your door!",
  price: 30,
  amountSold: 56,
  averageRating: 5,
};

const products = [product1, product2, product3, product4];

// add dummy accounts
const account1 = {
  _id: "000000000000000000000010",
  username: "BobsPizzeria",
  firstName: "Bob",
  lastName: "Fring",
  email: "bobspizzera@gmail.com",
  sellingProducts: [
    "000000000000000000000001",
    "000000000000000000000002",
    "000000000000000000000003",
    "000000000000000000000004",
  ],
};

const account2 = {
  _id: "000000000000000000000020",
  username: "StevesPizzeria",
  firstName: "Steve",
  lastName: "Fring",
  email: "stevespizzera@gmail.com",
  sellingProducts: [],
  productsPurchased: [
    "000000000000000000000001",
    "000000000000000000000002",
    "000000000000000000000003",
  ],
};

const accounts = [account1, account2];

const newProduct = {
  category: "Images",
  name: "Pizza Margherita",
  description: "Delicious pizza with mozzarella, tomatoes, and basil",
  price: 10,
};

// add dummy reviews
const productReview1 = {
  _id: "000000000000000000000100",
  text: "Very nice pizza",
  rating: 4,
  product: "000000000000000000000001",
  account: "000000000000000000000020",
};

const productReview2 = {
  _id: "000000000000000000000200",
  text: "Even nicer pizza",
  rating: 5,
  product: "000000000000000000000002",
  account: "000000000000000000000020",
};

const productReviews = [productReview1, productReview2];

beforeAll(async () => {
  await mongoose.connect(
    "mongodb+srv://nset793:ichoV7UICKDDFKRU@silver-sharks.l9tuwbz.mongodb.net/Node-API-Test?retryWrites=true&w=majority",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  );
});

// add fresh data before each test
beforeEach(async () => {
  for (const element of products) {
    const prod = new Product(element);
    await prod.save();
  }

  for (const element of accounts) {
    const acc = new Account(element);
    await acc.save();
  }

  for (const element of productReviews) {
    const rev = new ProductReview(element);
    await rev.save();
  }
});

// clean up data after each test
afterEach(async () => {
  await Product.deleteMany({});
  await Account.deleteMany({});
  await ProductReview.deleteMany({});
});

afterAll(async () => {
  await mongoose.connection.close();
});

describe("GET /products", () => {
  it("gets paginated products from server", (done) => {
    request(app)
      .get("/products")
      .send()
      .expect(200)
      .end((err, res) => {
        if (err) {
          return done(err);
        }

        const productsFromApi = res.body;

        expect(productsFromApi).toBeTruthy();
        expect(productsFromApi[0].length).toBe(4);
        expect(productsFromApi[1]).toBe(4);

        expect(productsFromApi[0][0].category).toBe("Images");
        expect(productsFromApi[0][0].name).toBe("Pizza");
        expect(productsFromApi[0][0].description).toBe(
          "Amazing photo of a pizza"
        );
        expect(productsFromApi[0][0].price).toBe(25);
        expect(productsFromApi[0][0].amountSold).toBe(5);
        expect(productsFromApi[0][0].averageRating.$numberDecimal).toBe("5");

        expect(productsFromApi[0][1].category).toBe("Videos");
        expect(productsFromApi[0][1].name).toBe("Pizza Cooking Video");
        expect(productsFromApi[0][1].description).toBe(
          "Amazing video of a pizza being cooked"
        );
        expect(productsFromApi[0][1].price).toBe(15);
        expect(productsFromApi[0][1].amountSold).toBe(2);
        expect(productsFromApi[0][1].averageRating.$numberDecimal).toBe("4");

        expect(productsFromApi[0][2].category).toBe("Music");
        expect(productsFromApi[0][2].name).toBe("Pizza Music Video");
        expect(productsFromApi[0][2].description).toBe("Amazing dancing pizza");
        expect(productsFromApi[0][2].price).toBe(5);
        expect(productsFromApi[0][2].amountSold).toBe(4);
        expect(productsFromApi[0][2].averageRating.$numberDecimal).toBe("3");

        expect(productsFromApi[0][3].category).toBe("Services");
        expect(productsFromApi[0][3].name).toBe("Pizza Delivery");
        expect(productsFromApi[0][3].description).toBe(
          "Amazing pizza delivered right to your door!"
        );
        expect(productsFromApi[0][3].price).toBe(30);
        expect(productsFromApi[0][3].amountSold).toBe(56);
        expect(productsFromApi[0][3].averageRating.$numberDecimal).toBe("5");

        return done();
      });
  });
});

it("adds product to server", (done) => {
  request(app)
    .post("/products/sell/000000000000000000000010")
    .send(newProduct)
    .set("Content-Type", "application/json")
    .set("Accept", "application/json")
    .expect(201)
    .end(async (err, res) => {
      if (err) {
        return done(err);
      }

      const newProductFromApi = res.body;

      expect(newProductFromApi.category).toBe("Images");
      expect(newProductFromApi.name).toBe("Pizza Margherita");
      expect(newProductFromApi.description).toBe(
        "Delicious pizza with mozzarella, tomatoes, and basil"
      );
      expect(newProductFromApi.price).toBe(10);
      expect(newProductFromApi.amountSold).toBe(0);
      expect(newProductFromApi.averageRating.$numberDecimal).toBe("0");

      const allProducts = await Product.find();
      expect(allProducts.length).toBe(5);

      const newProd = allProducts[4];
      expect(newProd._id.toString()).toBe(newProductFromApi._id);

      return done();
    });
});

const editedData = {
  name: "edited pizza name",
  description: "edited pizza description",
};

it("change product details", (done) => {
  request(app)
    .put("/products/000000000000000000000001")
    .send(editedData)
    .set("Content-Type", "application/json")
    .set("Accept", "application/json")
    .expect(200)
    .end(async (err, res) => {
      if (err) {
        return done(err);
      }

      // check new product's details
      const product = await Product.findById("000000000000000000000001");
      expect(product.name).toBe("edited pizza name");
      expect(product.description).toBe("edited pizza description");
      return done();
    });
});

it("change product details not found", (done) => {
  request(app)
    .put("/products/000000000000000000000007")
    .send(editedData)
    .set("Content-Type", "application/json")
    .set("Accept", "application/json")
    .expect(404)
    .end(async (err, res) => {
      if (err) {
        return done(err);
      }

      const response = res.text;
      expect(response).toBe("Product not found");
      return done();
    });
});

it("get products for specific category", (done) => {
  request(app)
    .get("/products/filter?category=Images")
    .send()
    .expect(200)
    .end(async (err, res) => {
      if (err) {
        return done(err);
      }

      const productsFromApi = res.body;

      expect(productsFromApi).toBeTruthy();
      expect(productsFromApi[0].length).toBe(1);
      expect(productsFromApi[1]).toBe(1);

      expect(productsFromApi[0][0].category).toBe("Images");
      expect(productsFromApi[0][0].name).toBe("Pizza");
      expect(productsFromApi[0][0].description).toBe(
        "Amazing photo of a pizza"
      );
      expect(productsFromApi[0][0].price).toBe(25);
      expect(productsFromApi[0][0].amountSold).toBe(5);
      expect(productsFromApi[0][0].averageRating.$numberDecimal).toBe("5");

      return done();
    });
});

it("gets product for category not found", (done) => {
  request(app)
    .get("/products/filter?category=NotFoundCategory")
    .send()
    .expect(404)
    .end(async (err, res) => {
      if (err) {
        return done(err);
      }

      const response = res.text;
      expect(response).toBe("No Products Were Found");

      return done();
    });
});

it("get products matching search term", (done) => {
  request(app)
    .get("/products/search?search=Video")
    .send()
    .expect(200)
    .end(async (err, res) => {
      if (err) {
        return done(err);
      }

      const productsFromApi = res.body;

      expect(productsFromApi).toBeTruthy();
      expect(productsFromApi[0].length).toBe(2);
      expect(productsFromApi[1]).toBe(2);

      expect(productsFromApi[0][0].category).toBe("Videos");
      expect(productsFromApi[0][0].name).toBe("Pizza Cooking Video");
      expect(productsFromApi[0][0].description).toBe(
        "Amazing video of a pizza being cooked"
      );
      expect(productsFromApi[0][0].price).toBe(15);
      expect(productsFromApi[0][0].amountSold).toBe(2);
      expect(productsFromApi[0][0].averageRating.$numberDecimal).toBe("4");

      expect(productsFromApi[0][1].category).toBe("Music");
      expect(productsFromApi[0][1].name).toBe("Pizza Music Video");
      expect(productsFromApi[0][1].description).toBe("Amazing dancing pizza");
      expect(productsFromApi[0][1].price).toBe(5);
      expect(productsFromApi[0][1].amountSold).toBe(4);
      expect(productsFromApi[0][1].averageRating.$numberDecimal).toBe("3");

      return done();
    });
});

it("gets product for search term found", (done) => {
  request(app)
    .get("/products/filter?search=NotFound")
    .send()
    .expect(404)
    .end(async (err, res) => {
      if (err) {
        return done(err);
      }

      const response = res.text;
      expect(response).toBe("No Products Were Found");

      return done();
    });
});

it("get specific product by id", (done) => {
  request(app)
    .get("/products/000000000000000000000001")
    .send()
    .expect(200)
    .end(async (err, res) => {
      if (err) {
        return done(err);
      }

      const productFromApi = res.body;

      expect(productFromApi).toBeTruthy();
      expect(productFromApi.category).toBe("Images");
      expect(productFromApi.name).toBe("Pizza");
      expect(productFromApi.description).toBe("Amazing photo of a pizza");
      expect(productFromApi.price).toBe(25);
      expect(productFromApi.amountSold).toBe(5);
      expect(productFromApi.averageRating.$numberDecimal).toBe("5");

      return done();
    });
});

it("gets product by id not found", (done) => {
  request(app)
    .get("/products/000000000000000000000007")
    .send()
    .expect(404)
    .end(async (err, res) => {
      if (err) {
        return done(err);
      }

      const response = res.text;
      expect(response).toBe("Product Not Found");

      return done();
    });
});

it("gets product by id invalid id", (done) => {
  request(app)
    .get("/products/invalidid")
    .send()
    .expect(400)
    .end(async (err, res) => {
      if (err) {
        return done(err);
      }

      const response = res.text;
      expect(response).toBe("Invalid Product ID");

      return done();
    });
});

it("delete product", (done) => {
  request(app)
    .delete("/products/000000000000000000000001")
    .send()
    .expect(200)
    .end(async (err, res) => {
      if (err) {
        return done(err);
      }

      const responseFromApi = res.body;
      expect(responseFromApi.message).toBe("Product deleted successfully");

      // check if product has been removed from database
      const product = await Product.findById("000000000000000000000001");
      expect(product).toBeNull();

      return done();
    });
});

it("deletes product id not found", (done) => {
  request(app)
    .delete("/products/000000000000000000000007")
    .send()
    .expect(404)
    .end(async (err, res) => {
      if (err) {
        return done(err);
      }

      const response = res.text;
      expect(response).toBe("Product Not Found");

      return done();
    });
});

it("buy product", (done) => {
  request(app)
    .post("/products/buy?accountId=000000000000000000000020")
    .set("x-user-id", "000000000000000000000020")
    .send([product3])
    .expect(200)
    .end(async (err, res) => {
      if (err) {
        return done(err);
      }

      const responseFromApi = res.body;
      expect(responseFromApi.message).toBe("Successfully bought product");

      // check if new product is in account's purchased products
      const currentAccount = await Account.findById("000000000000000000000020");
      expect(currentAccount.productsPurchased[2].toString()).toBe(
        "000000000000000000000003"
      );

      return done();
    });
});

it("get reviews for a product", (done) => {
  request(app)
    .get("/products/pid/000000000000000000000001/reviews")
    .expect(200)
    .end(async (err, res) => {
      if (err) {
        return done(err);
      }

      const responseFromApi = res.body;
      expect(responseFromApi[0].text).toBe("Very nice pizza");
      expect(responseFromApi[0].rating).toBe(4);
      expect(responseFromApi[0].product.toString()).toBe(
        "000000000000000000000001"
      );
      expect(responseFromApi[0].account._id.toString()).toBe(
        "000000000000000000000020"
      );

      return done();
    });
});

it("product id not found for review", (done) => {
  request(app)
    .get("/products/pid/000000000000000000000007/reviews")
    .send()
    .expect(404)
    .end(async (err, res) => {
      if (err) {
        return done(err);
      }

      const response = res.body;
      expect(response.error).toBe("Product not found");

      return done();
    });
});

const newReview = {
  text: "Great product!",
  rating: 5,
};

it("adds a review for a specific product", (done) => {
  request(app)
    .post("/products/pid/000000000000000000000003/review")
    .set("x-user-id", "000000000000000000000020")
    .set("productsPurchased", [
      { _id: "000000000000000000000001" },
      { _id: "000000000000000000000002" },
      { _id: "000000000000000000000003" },
    ])
    .send(newReview)
    .expect(200)
    .end(async (err, res) => {
      if (err) {
        return done(err);
      }

      const responseReview = res.body;

      // Check if the review has been added successfully
      expect(responseReview.text).toBe("Great product!");
      expect(responseReview.rating).toBe(5);
      expect(responseReview.product).toBe("000000000000000000000003");
      expect(responseReview.account).toBe("000000000000000000000020");

      const newReviewInDB = await ProductReview.findById(responseReview._id);

      // check if new review exists in database
      expect(newReviewInDB).toBeTruthy();

      return done();
    });
});

it("adds a review for an already reviewed product", (done) => {
  request(app)
    .post("/products/pid/000000000000000000000001/review")
    .set("x-user-id", "000000000000000000000020")
    .set("productsPurchased", [
      { _id: "000000000000000000000001" },
      { _id: "000000000000000000000002" },
      { _id: "000000000000000000000003" },
    ])
    .send(newReview)
    .expect(400)
    .end(async (err, res) => {
      if (err) {
        return done(err);
      }

      const response = res.body;

      expect(response.error).toBe("You already reviewed this product");

      return done();
    });
});

const invalidReview = {
  text: "Great product!",
  rating: 7,
};

it("adds review with invalid rating", (done) => {
  request(app)
    .post("/products/pid/000000000000000000000003/review")
    .set("x-user-id", "000000000000000000000020")
    .set("productsPurchased", [
      { _id: "000000000000000000000001" },
      { _id: "000000000000000000000002" },
      { _id: "000000000000000000000003" },
    ])
    .send(invalidReview)
    .expect(400)
    .end(async (err, res) => {
      if (err) {
        return done(err);
      }

      const response = res.body;

      expect(response.error).toBe("Invalid rating value");

      return done();
    });
});

it("adds review for product that doesn't exist", (done) => {
  request(app)
    .post("/products/pid/000000000000000000000007/review")
    .set("x-user-id", "000000000000000000000020")
    .set("productsPurchased", [
      { _id: "000000000000000000000001" },
      { _id: "000000000000000000000002" },
      { _id: "000000000000000000000003" },
    ])
    .send(newReview)
    .expect(404)
    .end(async (err, res) => {
      if (err) {
        return done(err);
      }

      const response = res.body;

      expect(response.error).toBe("Product not found");

      return done();
    });
});

it("adds review for product that is not purchased", (done) => {
  request(app)
    .post("/products/pid/000000000000000000000004/review")
    .set("x-user-id", "000000000000000000000020")
    .set("productsPurchased", [
      { _id: "000000000000000000000001" },
      { _id: "000000000000000000000002" },
      { _id: "000000000000000000000003" },
    ])
    .send(newReview)
    .expect(401)
    .end(async (err, res) => {
      if (err) {
        return done(err);
      }

      const response = res.body;

      expect(response.error).toBe(
        "You can only review products that you have purchased"
      );

      return done();
    });
});

it("checks if an account can add a review", (done) => {
  request(app)
    .get("/products/pid/000000000000000000000002/can-review")
    .set("x-user-id", "000000000000000000000020")
    .set("productsPurchased", [
      { _id: "000000000000000000000001" },
      { _id: "000000000000000000000002" },
      { _id: "000000000000000000000003" },
    ])
    .send()
    .expect(200)
    .end(async (err, res) => {
      if (err) {
        return done(err);
      }

      const response = res.body;

      expect(response).toBe(true);

      return done();
    });
});

it("checks if an account can add a review - product doesn't exist", (done) => {
  request(app)
    .get("/products/pid/000000000000000000000007/can-review")
    .set("x-user-id", "000000000000000000000020")
    .set("productsPurchased", [
      { _id: "000000000000000000000001" },
      { _id: "000000000000000000000002" },
      { _id: "000000000000000000000003" },
    ])
    .send()
    .expect(404)
    .end(async (err, res) => {
      if (err) {
        return done(err);
      }

      const response = res.body;

      expect(response.error).toBe("Product not found");

      return done();
    });
});

it("checks if an account can add a review - product not purchased", (done) => {
  request(app)
    .get("/products/pid/000000000000000000000004/can-review")
    .set("x-user-id", "000000000000000000000020")
    .set("productsPurchased", [
      { _id: "000000000000000000000001" },
      { _id: "000000000000000000000002" },
      { _id: "000000000000000000000003" },
    ])
    .send()
    .expect(401)
    .end(async (err, res) => {
      if (err) {
        return done(err);
      }

      const response = res.body;

      expect(response).toBe(false);

      return done();
    });
});

it("checks if an account can add a review - product already reviewed", (done) => {
  request(app)
    .get("/products/pid/000000000000000000000001/can-review")
    .set("x-user-id", "000000000000000000000020")
    .set("productsPurchased", [
      { _id: "000000000000000000000001" },
      { _id: "000000000000000000000002" },
      { _id: "000000000000000000000003" },
    ])
    .send()
    .expect(401)
    .end(async (err, res) => {
      if (err) {
        return done(err);
      }

      const response = res.body;

      expect(response).toBe(false);

      return done();
    });
});

it("checks landing page products", (done) => {
  request(app)
    .get("/products/landing-page")
    .send()
    .expect(200)
    .end(async (err, res) => {
      if (err) {
        return done(err);
      }

      const productsFromApi = res.body;

      expect(productsFromApi.imageProducts[0].name).toBe("Pizza");
      expect(productsFromApi.imageProducts[0].price).toBe(25);
      expect(productsFromApi.imageProducts[0].amountSold).toBe(5);

      return done();
    });
});
