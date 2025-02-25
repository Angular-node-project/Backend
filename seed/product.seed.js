const mongoose = require("mongoose");
const Product = require("../models/product.model"); // Adjust the path as necessary

// Array of product objects
const products = [
  {
    categories: [
      { category_id: "cc81f7fd-9271-4bc3-bee6-3e198e459eaa", name: "Air purifying" },
      { category_id: "cfdab376-c9e6-4120-836b-9adaddd7cd75", name: "Large Plants" },
      { category_id: "a2fe86e8-7729-40e4-8dc7-53e44bebe671", name: "Low maintenance" }
    ],
    name: "Alocasia Regal Shield",
    description: "Faucibus lacus tincidunt molestie accumsan nibh non odio aenean molestie purus tristique sed tempor consequat risus tellus amet augue egestas mauris scelerisque donec ultrices. Sollicitudin facilisis massa pellentesque in ultrices enim nunc ac egestas elementum ut in ornare sit malesuada.",
    qty: 30,
    price: 204.90,
    seller_id: "23c8a583-a933-437e-966b-41b2dd81bb15",
    status: "pending",
    pics: [
      "https://websitedemos.net/plant-shop-02/wp-content/uploads/sites/931/2021/08/plants-ecommerce-product-featured-img-17.jpg",
      "https://websitedemos.net/plant-shop-02/wp-content/uploads/sites/931/2021/08/plants-shop-product-gallery-img-7.jpg"
    ]
  },
  {
    categories: [
      { category_id: "cc81f7fd-9271-4bc3-bee6-3e198e459eaa", name: "Air purifying" },
      { category_id: "982dca04-040f-4e47-a88e-985d891a882b", name: "Herbs seeds" },
      { category_id: "cfdab376-c9e6-4120-836b-9adaddd7cd75", name: "Large Plants" }
    ],
    name: "Aralia Ming",
    description: "Faucibus lacus tincidunt molestie accumsan nibh non odio aenean molestie purus tristique sed tempor consequat risus tellus amet augue egestas mauris scelerisque donec ultrices. Sollicitudin facilisis massa pellentesque in ultrices enim nunc ac egestas elementum ut in ornare sit malesuada.",
    qty: 40,
    price: 284.90,
    seller_id: "23c8a583-a933-437e-966b-41b2dd81bb15",
    status: "pending",
    pics: [
      "https://websitedemos.net/plant-shop-02/wp-content/uploads/sites/931/2021/08/plants-ecommerce-product-featured-img-19.jpg",
      "https://websitedemos.net/plant-shop-02/wp-content/uploads/sites/931/2021/08/plants-shop-product-gallery-img-10.jpg"
    ]
  },
  {
    categories: [
      { category_id: "ab3ac948-2091-4c8a-ba49-57ee9c622a07", name: "Ceramic pots" },
      { category_id: "cfdab376-c9e6-4120-836b-9adaddd7cd75", name: "Large Plants" },
      { category_id: "812ea576-8823-43f1-8c06-d1fa19449c88", name: "Plant bundle" }
    ],
    name: "Bird of Paradise",
    description: "Faucibus lacus tincidunt molestie accumsan nibh non odio aenean molestie purus tristique sed tempor consequat risus tellus amet augue egestas mauris scelerisque donec ultrices. Sollicitudin facilisis massa pellentesque in ultrices enim nunc ac egestas elementum ut in ornare sit malesuada.",
    qty: 20,
    price: 249.90,
    seller_id: "23c8a583-a933-437e-966b-41b2dd81bb15",
    status: "pending",
    pics: [
      "https://websitedemos.net/plant-shop-02/wp-content/uploads/sites/931/2021/08/plants-ecommerce-product-featured-img-4.jpg",
      "https://websitedemos.net/plant-shop-02/wp-content/uploads/sites/931/2021/08/plants-shop-product-gallery-img-12.jpg"
    ]
  },
  {
    categories: [
      { category_id: "cc81f7fd-9271-4bc3-bee6-3e198e459eaa", name: "Air purifying" },
      { category_id: "55322cae-26a9-4e79-a99f-08f9632630a1", name: "Medium Plants" }
    ],
    name: "Birdnest Japanese",
    description: "Faucibus lacus tincidunt molestie accumsan nibh non odio aenean molestie purus tristique sed tempor consequat risus tellus amet augue egestas mauris scelerisque donec ultrices. Sollicitudin facilisis massa pellentesque in ultrices enim nunc ac egestas elementum ut in ornare sit malesuada.",
    qty: 25,
    price: 84.90,
    seller_id: "23c8a583-a933-437e-966b-41b2dd81bb15",
    status: "pending",
    pics: [
      "https://websitedemos.net/plant-shop-02/wp-content/uploads/sites/931/2021/08/plants-ecommerce-product-featured-img-8.jpg",
      "https://websitedemos.net/plant-shop-02/wp-content/uploads/sites/931/2021/08/plants-shop-product-gallery-img-20.jpg"
    ]
  },
  {
    categories: [
      { category_id: "c449be4b-88f6-4c07-8cd5-8f17546f24f3", name: "Plant accessories" }
    ],
    name: "Bypass Secateur",
    description: "Faucibus lacus tincidunt molestie accumsan nibh non odio aenean molestie purus tristique sed tempor consequat risus tellus amet augue egestas mauris scelerisque donec ultrices. Sollicitudin facilisis massa pellentesque in ultrices enim nunc ac egestas elementum ut in ornare sit malesuada.",
    qty: 50,
    price: 48.90,
    seller_id: "23c8a583-a933-437e-966b-41b2dd81bb15",
    status: "pending",
    pics: [
      "https://websitedemos.net/plant-shop-02/wp-content/uploads/sites/931/2021/08/plants-ecommerce-accessories-product-featured-img-3.jpg"
    ]
  },
  {
    categories: [
      { category_id: "982dca04-040f-4e47-a88e-985d891a882b", name: "Herbs seeds" },
      { category_id: "55322cae-26a9-4e79-a99f-08f9632630a1", name: "Medium Plants" },
      { category_id: "812ea576-8823-43f1-8c06-d1fa19449c88", name: "Plant bundle" }
    ],
    name: "Calathea Beauty Star",
    description: "Faucibus lacus tincidunt molestie accumsan nibh non odio aenean molestie purus tristique sed tempor consequat risus tellus amet augue egestas mauris scelerisque donec ultrices. Sollicitudin facilisis massa pellentesque in ultrices enim nunc ac egestas elementum ut in ornare sit malesuada.",
    qty: 30,
    price: 79.90,
    seller_id: "23c8a583-a933-437e-966b-41b2dd81bb15",
    status: "pending",
    pics: [
      "https://websitedemos.net/plant-shop-02/wp-content/uploads/sites/931/2021/08/plants-ecommerce-product-featured-img-7.jpg",
      "https://websitedemos.net/plant-shop-02/wp-content/uploads/sites/931/2021/08/plants-shop-product-gallery-img-5.jpg"
    ]
  },
  {
    categories: [
      { category_id: "982dca04-040f-4e47-a88e-985d891a882b", name: "Herbs seeds" },
      { category_id: "cfdab376-c9e6-4120-836b-9adaddd7cd75", name: "Large Plants" },
      { category_id: "a2fe86e8-7729-40e4-8dc7-53e44bebe671", name: "Low maintenance" }
    ],
    name: "Calathea Rufibarba",
    description: "Faucibus lacus tincidunt molestie accumsan nibh non odio aenean molestie purus tristique sed tempor consequat risus tellus amet augue egestas mauris scelerisque donec ultrices. Sollicitudin facilisis massa pellentesque in ultrices enim nunc ac egestas elementum ut in ornare sit malesuada.",
    qty: 15,
    price: 109.90,
    seller_id: "23c8a583-a933-437e-966b-41b2dd81bb15",
    status: "pending",
    pics: [
      "https://websitedemos.net/plant-shop-02/wp-content/uploads/sites/931/2021/08/plants-ecommerce-product-featured-img-18.jpg",
      "https://websitedemos.net/plant-shop-02/wp-content/uploads/sites/931/2021/08/plants-shop-product-gallery-img-3.jpg"
    ]
  },
  {
    categories: [
      { category_id: "cc81f7fd-9271-4bc3-bee6-3e198e459eaa", name: "Air purifying" },
      { category_id: "6f2b6fbc-7f91-49c1-ae37-7b902b255cf6", name: "Indoor Plants" },
      { category_id: "cfdab376-c9e6-4120-836b-9adaddd7cd75", name: "Large Plants" }
    ],
    name: "Dracaena Lisa",
    description: "Faucibus lacus tincidunt molestie accumsan nibh non odio aenean molestie purus tristique sed tempor consequat risus tellus amet augue egestas mauris scelerisque donec ultrices. Sollicitudin facilisis massa pellentesque in ultrices enim nunc ac egestas elementum ut in ornare sit malesuada.",
    qty: 20,
    price: 114.90,
    seller_id: "23c8a583-a933-437e-966b-41b2dd81bb15",
    status: "pending",
    pics: [
      "https://websitedemos.net/plant-shop-02/wp-content/uploads/sites/931/2021/08/plants-ecommerce-product-featured-img-20.jpg",
      "https://websitedemos.net/plant-shop-02/wp-content/uploads/sites/931/2021/08/plants-shop-product-gallery-img-18.jpg"
    ]
  },
  {
    categories: [
      { category_id: "ab3ac948-2091-4c8a-ba49-57ee9c622a07", name: "Ceramic pots" },
      { category_id: "982dca04-040f-4e47-a88e-985d891a882b", name: "Herbs seeds" },
      { category_id: "55322cae-26a9-4e79-a99f-08f9632630a1", name: "Medium Plants" }
    ],
    name: "Euphorbia Ingens",
    description: "Faucibus lacus tincidunt molestie accumsan nibh non odio aenean molestie purus tristique sed tempor consequat risus tellus amet augue egestas mauris scelerisque donec ultrices. Sollicitudin facilisis massa pellentesque in ultrices enim nunc ac egestas elementum ut in ornare sit malesuada.",
    qty: 25,
    price: 104.90,
    seller_id: "23c8a583-a933-437e-966b-41b2dd81bb15",
    status: "pending",
    pics: [
      "https://websitedemos.net/plant-shop-02/wp-content/uploads/sites/931/2021/08/plants-ecommerce-product-featured-img-10.jpg",
      "https://websitedemos.net/plant-shop-02/wp-content/uploads/sites/931/2021/08/plants-shop-product-gallery-img-9.jpg"
    ]
  }
];

// Connect to MongoDB and seed data
mongoose
  .connect("mongodb+srv://sarahsalem9898:tCIooq7nagBwiJZm@angular-node-cluster.qaz70.mongodb.net/ecommerce-pro", {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log("Connected to MongoDB");

    // Delete all existing products
    Product.deleteMany({})
      .then(() => {
        console.log("Existing products removed");

        // Insert new products
        Product.insertMany(products)
          .then(() => {
            console.log("Products seeded successfully");
            mongoose.connection.close();
          })
          .catch((err) => {
            console.error("Error seeding products:", err);
            mongoose.connection.close();
          });
      })
      .catch((err) => {
        console.error("Error removing existing products:", err);
        mongoose.connection.close();
      });
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB:", err);
  });
