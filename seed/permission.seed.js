const mongoose = require("mongoose");
const Permission = require("../models/permission.model"); // Adjust the path if needed
const { v4: uuidv4 } = require("uuid");

const permissions = [
  { controller: "product", action: "show" },
  { controller: "product", action: "add" },
  { controller: "product", action: "update" },
  { controller: "product", action: "delete" },
  { controller: "product", action: "changeStatus" },
  { controller: "product", action: "checkout" },

  { controller: "clerks", action: "show" },
  { controller: "clerks", action: "add" },
  { controller: "clerks", action: "update" },
  { controller: "clerks", action: "delete" },
  { controller: "clerks", action: "changeStatus" },


  { controller: "seller", action: "show" },
  { controller: "seller", action: "changeStatus" },

  { controller: "updateProductRequest", action: "show" },
  { controller: "updateProductRequest", action: "changeStatus" },

  { controller: "customerService", action: "show" },
  { controller: "customerService", action: "reply" },

  { controller: "category", action: "show" },
  { controller: "category", action: "add" },
  { controller: "category", action: "update" },
  { controller: "category", action: "changeStatus" },
];

async function seedPermissions() {
  try {
    await mongoose.connect("mongodb+srv://sarahsalem9898:tCIooq7nagBwiJZm@angular-node-cluster.qaz70.mongodb.net/ecommerce", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log("Connected to MongoDB");

    await Permission.deleteMany({});
    console.log("Existing permissions cleared");

    const permissionDocs = permissions.map((perm) => ({
      permission_id: uuidv4(),
      controller: perm.controller,
      action: perm.action,
    }));

    await Permission.insertMany(permissionDocs);
    console.log("Permissions seeded successfully");

    mongoose.disconnect();
  } catch (error) {
    console.error("Seeding error:", error);
    mongoose.disconnect();
  }
}

seedPermissions();
