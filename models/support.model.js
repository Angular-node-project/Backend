const mongoose = require("mongoose");
const { v4: uuidv4 } = require('uuid');

const supportSchema = new mongoose.Schema({
    id: { type: String, default: () => uuidv4(), unique: true, required: true },
    name:{type:String, required:false},
    email: { type: String, required: true },
    inquiry: { type: String, required: true },
    status: { type: String, enum: ['resolved', 'pending'], required: true, default: 'pending' },
}, { timestamps: true });

module.exports = mongoose.model("Support", supportSchema);