import mongoose from "mongoose";

const Schema = mongoose.Schema;

const accountSchema = new Schema({
  _id: {
    type: String,
    required: true,
  },
  username: String,
  passHash: String,
  firstName: String,
  middleNames: String,
  lastName: String,
  email: String,
  dateOfBirth: Date,
  accountType: {
    type: String, 
    enum: ['Admin','Normal']
  },
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
},{
  timestamps: {}
});

export const Account = mongoose.model("Account", accountSchema);
