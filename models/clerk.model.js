const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');

const clerkSchema = new mongoose.Schema({
    clerk_id: {type: String,default: () => uuidv4(),unique: true,required:true},
    name: { type: String,required: true},
    email: { type: String,required: true},
    password: { type: String,required: true},
    role_id:{type:String,required:true},
    status: {type: String,enum: ['active', 'inactive'],default: 'active'},
}, {
    timestamps: true, 
});

module.exports = mongoose.model('Clerk', clerkSchema);
