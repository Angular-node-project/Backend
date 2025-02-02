const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');

const customerSchema = new mongoose.Schema({
    customer_id: { type: String,default:()=>uuidv4(), unique: true, required: true }, 
    name: { type: String, required: true },                    
    email: { type: String, unique: true, required: true },
    password:{type:String,required:true},      
    address: { type: String ,required:false },                                  
    phone_number: { type: String ,required:false},                            
    gender: { type: String, enum: ['male', 'female'],required:false }, 
    status: { type: String, enum: ['active', 'inactive'], required: true,default:"active" } 
});

module.exports = mongoose.model('Customer', customerSchema);