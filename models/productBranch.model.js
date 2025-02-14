const mongoose = require("mongoose");
const { v4: uuidv4 } = require('uuid');
const ProductBranchSchema = new mongoose.Schema({
    ProductBranch_id: { type: String, default: () => uuidv4(), unique: true, required: true },
    product_id: { type: String, required: true },
    branch:{ branch_id:{type:String,required:true},name:{type:String,required:true}},
    qty:{type:String,required:true},
    status: { type: String, enum: ['active', 'inactive'], required: true, default: 'active' },
}, { timestamps: true });

module.exports = mongoose.model("BranchProduct", ProductBranchSchema);