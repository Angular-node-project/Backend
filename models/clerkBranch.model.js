const mongoose = require("mongoose");
const { v4: uuidv4 } = require('uuid');

const ClerkbranchSchema = new mongoose.Schema({
    clerkBranch_id: { type: String, default: () => uuidv4(), unique: true, required: true },
    branch:{ branch_id:{type:String,required:true},name:{type:String,required:true}},
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    role:{ type: String, enum: ['manger', 'cashier','storeKeeper'], required: true },
    status: { type: String, enum: ['active', 'inactive'], required: true, default: 'active' },
}, { timestamps: true });


module.exports = mongoose.model("clerkBranch",ClerkbranchSchema);