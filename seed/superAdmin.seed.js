const mongoose = require("mongoose");
const { v4: uuidv4 } = require("uuid");
const bcrypt = require('bcrypt');

const Clerk = require("../models/clerk.model");
const Role = require("../models/role.model"); 
const dbURI = "mongodb+srv://sarahsalem9898:tCIooq7nagBwiJZm@angular-node-cluster.qaz70.mongodb.net/ecommerce";

mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("Connected to MongoDB");
    seedSuperAdmin();
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB", err);
  });

async function seedSuperAdmin() {
  try {

    let superAdminRole = await Role.findOne({ name: "super_admin" });
    if (!superAdminRole) {
      superAdminRole = new Role({
        role_id: uuidv4(),
        name: "super_admin",
        permissions: [] 
      });
      await superAdminRole.save();
      console.log("Super Admin role created.");
    } else {
      console.log("Super Admin role already exists.");
    }

    let superAdmin = await Clerk.findOne({ email: "superAdmin@gmail.com" });
    if (!superAdmin) {
      const hashedPassword = await bcrypt.hash("123456", 10);

      superAdmin = new Clerk({
        clerk_id: uuidv4(),
        name: "Super Admin",
        email: "superAdmin@gmail.com",
        password: hashedPassword,
        role_id: superAdminRole.role_id, 
        status: "active",
      });

      await superAdmin.save();
      console.log("Super Admin account created.");
    } else {
      console.log("Super Admin account already exists.");
    }
    mongoose.connection.close();
  } catch (error) {
    console.error("Error seeding Super Admin:", error);
    mongoose.connection.close();
  }
}
