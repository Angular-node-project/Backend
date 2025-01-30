const mongoose = require("mongoose");
const { v4: uuidv4 } = require("uuid");

const SellerUpdateProductRequestSchema = new mongoose.Schema(
  {
    request_id: {
      type: String,
      default: () => uuidv4(),
      unique: true,
      required: true,
    },
    seller: {
      seller_id: { type: String, required: true }, 
      name: { type: String, required: true }, 
    },
    updatedProduct: {
      product_id: { type: String, required: true },
      categories: {
        type: [
          {
            category_id: { type: String, required: true },
            name: { type: String, required: true },
          },
        ],
      },
      name: { type: String, required: true },
      description: { type: String, required: true },
      details: { type: String, required: false },
      qty: { type: Number, required: true, min: 1 },
      price: { type: Number, required: true, min: 1 },
      seller_id: { type: String, required: true },
      status: {
        type: String,
        enum: ["active", "inactive", "pending", "outStock"],
        required: true,
      },
      pics: { type: [String], default: [] }
     
    },
    status: {
      type: String,
      enum: ["pending", "approved", "disapproved"],
      default: "pending",
    }
  },{timestamps:true}
);

module.exports = mongoose.model("SellerUpdateProductRequest", SellerUpdateProductRequestSchema);
