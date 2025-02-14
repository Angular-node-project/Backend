
const mongoose = require("mongoose");
const { v4: uuidv4 } = require('uuid');

const branchSchema = new mongoose.Schema({
    branch_id: { type: String, default: () => uuidv4(), unique: true, required: true },
    name: { type: String, required: true },
    location:{type:String,required:true},
    status: { type: String, enum: ['active', 'inactive'], required: true, default: 'active' },
}, { timestamps: true });

module.exports = mongoose.model("Branch", branchSchema);