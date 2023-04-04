import mongoose from "mongoose";

const Account = mongoose.model("Account", {
  id: {
    type: "String",
    unique: true,
  },
  username: "String",
  passHash: "String",
  firstName: "String",
  middleNames: "String",
  lastName: "String",
  dateOfBirth: "Date",
  dateCreated: "Date",
  accountType: "String",
  locationBased: "String",
  sellerRating: "Decimal",
  sellerReviews: [
    {
      type: "Schema.Types.ObjectId",
      ref: "SellerReview",
    },
  ],
  productsPurchased: [
    {
      type: "Schema.Types.ObjectId",
      ref: "Product",
    },
  ],
  sellingProducts: [
    {
      type: "Schema.Types.ObjectId",
      ref: "Product",
    },
  ],
  creditCards: [
    {
      encryptedInformation: "String",
    },
  ],
});

module.exports = Account;
