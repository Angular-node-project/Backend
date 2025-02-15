const mongoose = require("mongoose");
const Branch = require("../models/branch.model");
require("dotenv").config();

const branches = [
    { name: "Cairo Branch", location: "Tahrir Square, Cairo", status: "active" },
    { name: "Alexandria Branch", location: "Corniche Road, Alexandria", status: "active" },
    { name: "Giza Branch", location: "Pyramids Street, Giza", status: "active" }
];

const dbURI ='mongodb+srv://sarahsalem9898:tCIooq7nagBwiJZm@angular-node-cluster.qaz70.mongodb.net/ecommerce';
const seedDatabase = async () => {
    try {
        await mongoose.connect(dbURI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });

        console.log("Connected to MongoDB");
        await Branch.deleteMany(); 
        console.log("Existing branches deleted");
        
        const insertedBranches = await Branch.insertMany(branches);
        console.log("Branches seeded:", insertedBranches);
    } catch (error) {
        console.error("Error seeding database:", error);
    } finally {
        mongoose.connection.close();
    }
};

seedDatabase();
