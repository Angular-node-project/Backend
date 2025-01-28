const mongoose = require("mongoose");
const Product = require("../models/product.model"); 

const imagePath = "https://websitedemos.net/plant-shop-02/wp-content/uploads/sites/931/2021/08/plants-ecommerce-product-featured-img-17.jpg";

// Connect to MongoDB
mongoose.connect("mongodb://localhost:27017/ecommerce", {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log("MongoDB connected"))
  .catch(err => console.error("MongoDB connection error:", err));

const products = [];

for (let i = 1; i <= 13; i++) {
    products.push({
        category_id: `category_${i}`,
        name: `Product ${i}`,
        description: `This is the description for product ${i}.`,
        qty: Math.floor(Math.random() * 50) + 1, 
        price: Math.floor(Math.random() * 500) + 50, 
        seller_id: `seller_${i}`,
        status: "active",
        pics: [imagePath]
    });
}

const seedDB = async () => {
    try {
        await Product.deleteMany({}); 
        await Product.insertMany(products);
        console.log("Database seeded successfully!");
        mongoose.connection.close(); 
    } catch (error) {
        console.error("Error seeding database:", error);
    }
};


seedDB();
