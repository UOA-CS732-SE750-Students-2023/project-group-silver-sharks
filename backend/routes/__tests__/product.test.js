import productRouter from "../product.js";
import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose from "mongoose";
import express from "express";
import request from "supertest";
import bodyParser from "body-parser";
import { Product } from "../../models/productModel.js";
import { Account } from "../../models/accountModel.js";
import connectDB from "../../db/mongoose.js";

let mongod;

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(productRouter);

const product1 = {
  _id: new mongoose.Types.ObjectId("000000000000000000000001"),
  category: "Images",
  name: "Pizza",
  description: "Amazing photo of a pizza",
  price: 25,
  amountSold: 5,
  averageRating: 5,
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

const account1 = {
  _id: "000000000000000000000010",
  username: "BobsPizzeria",
  firstName: "Bob",
  lastName: "Fring",
  email: "bobspizzera@gmail.com",
  sellingProducts: [],
};

const account2 = {
  _id: "000000000000000000000020",
  username: "StevesPizzeria",
  firstName: "Steve",
  lastName: "Fring",
  email: "stevespizzera@gmail.com",
  sellingProducts: [],
};

const accounts = [account1, account2];

const newProduct = {
  category: "Images",
  name: "Pizza Margherita",
  description: "Delicious pizza with mozzarella, tomatoes, and basil",
  price: 10,
};

beforeAll(async () => {
  await mongoose.connect(process.env.TEST_DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
});

beforeEach(async () => {
  // await mongoose.connection.db.dropDatabase();

  // const coll = await mongoose.connection.db.createCollection("products");
  // await coll.insertMany(products);

  // const coll1 = await mongoose.connection.db.createCollection("Account");
  // await coll1.insertMany(accounts);
  for (const element of products) {
    const prod = new Product(element);
    await prod.save();
  }

  for (const element of accounts) {
    const acc = new Account(acc);
    await acc.save();
  }
});

afterEach(async () => {
  for (const element of products) {
    await Product.findByIdAndDelete(element._id);
  }
  for (const element of accounts) {
    await Account.findByIdAndDelete(element._id);
  }
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
        console.log(productsFromApi);

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
        expect(productsFromApi[0][0].averageRating).toBe(5);

        expect(productsFromApi[0][1].category).toBe("Videos");
        expect(productsFromApi[0][1].name).toBe("Pizza Cooking Video");
        expect(productsFromApi[0][1].description).toBe(
          "Amazing video of a pizza being cooked"
        );
        expect(productsFromApi[0][1].price).toBe(15);
        expect(productsFromApi[0][1].amountSold).toBe(2);
        expect(productsFromApi[0][1].averageRating).toBe(4);

        expect(productsFromApi[0][2].category).toBe("Music");
        expect(productsFromApi[0][2].name).toBe("Pizza Music Video");
        expect(productsFromApi[0][2].description).toBe("Amazing dancing pizza");
        expect(productsFromApi[0][2].price).toBe(5);
        expect(productsFromApi[0][2].amountSold).toBe(4);
        expect(productsFromApi[0][2].averageRating).toBe(3);

        expect(productsFromApi[0][3].category).toBe("Services");
        expect(productsFromApi[0][3].name).toBe("Pizza Delivery");
        expect(productsFromApi[0][3].description).toBe(
          "Amazing pizza delivered right to your door!"
        );
        expect(productsFromApi[0][3].price).toBe(30);
        expect(productsFromApi[0][3].amountSold).toBe(56);
        expect(productsFromApi[0][3].averageRating).toBe(5);

        return done();
      });
  });
});

// describe("POST /products/sell/000000000000000000000010", () => {
//   it("adds product to server", (done) => {
//     request(app)
//       .post("/products/sell/000000000000000000000010")
//       .send(newProduct)
//       .set("Content-Type", "application/json")
//       .set("Accept", "application/json")
//       .expect(201)
//       .end((err, res) => {
//         if (err) {
//           return done(err);
//         }

//         const newProductFromApi = res.body;
//         console.log(newProductFromApi);

//         expect(newProductFromApi.category).toBe("Images");
//         expect(newProductFromApi.name).toBe("Pizza Margherita");
//         expect(newProductFromApi.description).toBe(
//           "Delicious pizza with mozzarella, tomatoes, and basil"
//         );
//         expect(newProductFromApi.price).toBe(10);
//         expect(newProductFromApi.amountSold).toBe(0);
//         expect(newProductFromApi.averageRating).toBe(0);

//         expect();

//         return done();
//       });
//   });
// });
