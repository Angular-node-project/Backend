const mongoose = require("mongoose");
const { v4: uuidv4 } = require('uuid');

const permissionSchema = new mongoose.Schema({
    permission_id: { type: String, default: () => uuidv4, unique: true, required: true },
    controller: { type: String, required: true },
    action: { type: String, required: true },
}, { timestamps: true });

module.exports = mongoose.model("Permission", permissionSchema);
