const mongoose = require("mongoose");
const Permission = require("../models/permission.model"); // Adjust the path if needed
const { v4: uuidv4 } = require("uuid");

const permissions = [

  { controller:"analysis",action:"show" },
  { controller: "products", action: "show" },
  { controller: "products", action: "add" },
  { controller: "products", action: "update" },
  { controller: "products", action: "changeStatus" },

  { controller: "systemClerks", action: "show" },
  { controller: "systemClerks", action: "add" },
  { controller: "systemClerks", action: "update" },
  { controller: "systemClerks", action: "delete" },
  { controller: "systemClerks", action: "changeStatus" },

  { controller: "branchClerks", action: "show" },
  { controller: "branchClerks", action: "add" },
  { controller: "branchClerks", action: "update" },
  { controller: "branchClerks", action: "changeStatus" },

  { controller: "roles", action: "show" },
  { controller: "roles", action: "add" },
  { controller: "roles", action: "update" },
  { controller: "roles", action: "delete" },
  { controller: "roles", action: "changeStatus" },

  {controller:"clerkRequests",action:"show"},
  {controller:"clerkRequests",action:"changeStatus"},


  { controller: "categories", action: "show" },
  { controller: "categories", action: "add" },
  { controller: "categories", action: "update" },
  { controller: "categories", action: "changeStatus" },

  { controller: "customerService", action: "show" },
  { controller: "customerService", action: "reply" },

  {controller:"branches",action:"show"},
  {controller:"branches",action:"add"},
  {controller:"branches",action:"update"},
  {controller:"branches",action:"changeStatus"},

  { controller: "sellers", action: "show" },
  { controller: "sellers", action: "add" },
  { controller: "sellers", action: "update" },
  { controller: "sellers", action: "changeStatus" },

  { controller: "sellerRequests", action: "show" },
  { controller: "sellerRequests", action: "changeStatus" },

  {controller:"orders",action:"show"},
  {controller:"orders",action:"changeStatus"}

];

async function seedPermissions() {
  try {
    await mongoose.connect("mongodb+srv://sarahsalem9898:tCIooq7nagBwiJZm@angular-node-cluster.qaz70.mongodb.net/ecommerce-pro", {
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
