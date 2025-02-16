const mongoose = require("mongoose");
const ClerkBranch = require("../models/clerkBranch.model"); 
const bcrypt=require('bcrypt');

const seedClerk = async () => {
  try {
    await mongoose.connect("mongodb+srv://sarahsalem9898:tCIooq7nagBwiJZm@angular-node-cluster.qaz70.mongodb.net/ecommerce", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    var hashedPassword=await bcrypt.hash("123456",10);
    const clerk = new ClerkBranch({
      branch: { branch_id: "df0a56a9-b4a0-4acb-9090-e33fdf26e16c", name: "Cairo Branch" },
      name: "John Doe",
      email: "clerkManger@gmail.com",
      password: hashedPassword, 
      role: "Manager",
      status: "active",
    });

    await clerk.save();
    console.log("Clerk seeded successfully");
  } catch (error) {
    console.error("Error seeding clerk:", error);
  } finally {
    await mongoose.disconnect();
  }
};

seedClerk();
