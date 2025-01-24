const mongoose = require("mongoose");
const { v4: uuidv4 } = require('uuid');
const cartSchema = new mongoose.Schema({
    cart_id: { type: String,default:()=>uuidv4(), unique: true, required: true },
    customer_id: { type: String, required: true },
    product:[{
        product_id: { type:String, required: true },     
        seller_id: { type: String, required: true }, 
        name: { type: String, required: true },          
        qty:{ type: Number, required: true ,min:1},
        price:{type: Number, required: true ,min:1},
        pic_path:{type:String,required:false}
    }]
}, { timestamps: true });

module.exports = mongoose.model("Cart", cartSchema);
