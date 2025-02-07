const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');

const sellerSchema = new mongoose.Schema({
    seller_id: { type: String,default:()=>uuidv4(), unique: true, required: true },       
    name: { type: String, required: true },                         
    email: { type: String, unique: true, required: true },           
    password: { type: String, required: true },                     
    registeration_number: { type: String, unique: true, required: false },
    national_id: { type: String, unique: true, required: true },   
    phone_number: { type: String, required: false },                 
    wallet: { type: Number, required: false,default:0 },                 
    status: { type: String, enum: ['active','pending', 'inactive'], required: true ,default:'pending'},
}, { timestamps: true });                                          

module.exports = mongoose.model('Seller', sellerSchema);


