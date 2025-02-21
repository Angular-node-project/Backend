const mongoose = require("mongoose");
const bcrypt=require('bcrypt');
const seller = require("../models/seller.model"); 

const seedseller= async () => {
  try {
    await mongoose.connect("mongodb+srv://sarahsalem9898:tCIooq7nagBwiJZm@angular-node-cluster.qaz70.mongodb.net/ecommerce-stage", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    var hashedPassword=await bcrypt.hash("123456",10);

    const sell = new seller({
     name:"sara salem",
     email:"sasasalem44@gmail.com",
     password:hashedPassword,
     registeration_number:"12345tt",
     phone_number:"01016855078",
     national_id:"298550120313",
     status:'active',
     wallet:0,
    });

    await sell.save();
    console.log("seller seeded successfully");
  } catch (error) {
    console.error("Error seeding seller:", error);
  } finally {
    await mongoose.disconnect();
  }
};

seedseller();
