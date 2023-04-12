import mongoose from "mongoose";

const Schema = mongoose.Schema;

const accountSchema = new Schema({
  id: {
    type: String,
    unique: true,
  },
  username: String,
  passHash: String,
  firstName: String,
  middleNames: String,
  lastName: String,
  dateOfBirth: Date,
  dateCreated: Date,
  accountType: String,
  locationBased: String,
  sellerRating: Number,
  sellerReviews: [
    {
      type: Schema.Types.ObjectId,
      ref: "SellerReview",
    },
  ],
  productsPurchased: [
    {
      type: Schema.Types.ObjectId,
      ref: "Product",
    },
  ],
  sellingProducts: [
    {
      type: Schema.Types.ObjectId,
      ref: "Product",
    },
  ],
  creditCards: [
    {
      lastFourDigits: String,
      encryptedInformation: String,
    },
  ],
});

export const Account = mongoose.model("Account", accountSchema);
