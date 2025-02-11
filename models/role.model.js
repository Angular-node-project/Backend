const mongoose = require("mongoose");
const { v4: uuidv4 } = require('uuid');

const roleSchema = new mongoose.Schema({
  role_id: { type: String, default: () => uuidv4(), unique: true, required: true },
  name: { type: String, required: true },
  permissions: [{
    permission_id: { type: String,required:true },
    controller: { type: String, required: true },
    action: { type: String, required: true },
  }],
  status: { type: String, enum: ['active', 'inactive','deleted'], required: true, default: 'active' },
}, { timestamps: true });

roleSchema.path('permissions').schema.set('_id', false);
module.exports = mongoose.model("Role", roleSchema);
