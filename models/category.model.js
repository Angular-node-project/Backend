const mongoose = require("mongoose");
const { v4: uuidv4 } = require('uuid');

const categorySchema = new mongoose.Schema({
    category_id: { type: String, default: () => uuidv4(), unique: true, required: true },
    name: { type: String, required: true },
    status: { type: String, enum: ['active', 'inactive'], required: true, default: 'active' },
}, { timestamps: true });

module.exports = mongoose.model("Category", categorySchema);