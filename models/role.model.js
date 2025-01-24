const mongoose = require("mongoose");
const { v4: uuidv4 } = require('uuid');

const roleSchema = new mongoose.Schema({
  role_id: { type: String,default:()=>uuidv4(), unique: true, required: true }, 
  name: { type: String, required: true },                 
  permissions: [
    {
      controller: { type: String, required: true },       
      action: { type: String, required: true }           
    }
  ]
}, { timestamps: true }); 

module.exports = mongoose.model("Role", roleSchema);
