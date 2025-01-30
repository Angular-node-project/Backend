const mongoose = require("mongoose");
const Product = require("../models/product.model"); // Adjust the path as necessary

// Array of product objects
const products = [
  {
    categories: [
      { category_id: "112657c5-787a-4053-a9cc-ce3f650f7b60", name: "Air purifying" },
      { category_id: "d8be6a08-2dd2-4b5a-93f3-6095fd7f336e", name: "Large Plants" },
      { category_id: "db97ec8b-aaae-479e-a03f-45983c39461e", name: "Low maintenance" }
    ],
    name: "Alocasia Regal Shield",
    description: "Faucibus lacus tincidunt molestie accumsan nibh non odio aenean molestie purus tristique sed tempor consequat risus tellus amet augue egestas mauris scelerisque donec ultrices. Sollicitudin facilisis massa pellentesque in ultrices enim nunc ac egestas elementum ut in ornare sit malesuada.",
    qty: 30,
    price: 204.90,
    seller_id: "seller_1",
    status: "active",
    pics: [
      "https://websitedemos.net/plant-shop-02/wp-content/uploads/sites/931/2021/08/plants-ecommerce-product-featured-img-17.jpg",
      "https://websitedemos.net/plant-shop-02/wp-content/uploads/sites/931/2021/08/plants-shop-product-gallery-img-7.jpg"
    ]
  },
  {
    categories: [
      { category_id: "112657c5-787a-4053-a9cc-ce3f650f7b60", name: "Air purifying" },
      { category_id: "42e7f44a-d25b-4514-b50c-be728d274d8a", name: "Herbs seeds" },
      { category_id: "d8be6a08-2dd2-4b5a-93f3-6095fd7f336e", name: "Large Plants" }
    ],
    name: "Aralia Ming",
    description: "Faucibus lacus tincidunt molestie accumsan nibh non odio aenean molestie purus tristique sed tempor consequat risus tellus amet augue egestas mauris scelerisque donec ultrices. Sollicitudin facilisis massa pellentesque in ultrices enim nunc ac egestas elementum ut in ornare sit malesuada.",
    qty: 40,
    price: 284.90,
    seller_id: "seller_2",
    status: "active",
    pics: [
      "https://websitedemos.net/plant-shop-02/wp-content/uploads/sites/931/2021/08/plants-ecommerce-product-featured-img-19.jpg",
      "https://websitedemos.net/plant-shop-02/wp-content/uploads/sites/931/2021/08/plants-shop-product-gallery-img-10.jpg"
    ]
  },
  {
    categories: [
      { category_id: "7146831f-7874-4040-ab37-aae78f759af8", name: "Ceramic pots" },
      { category_id: "d8be6a08-2dd2-4b5a-93f3-6095fd7f336e", name: "Large Plants" },
      { category_id: "055bc69b-93b9-47a6-8381-b0d17f42300c", name: "Plant bundle" }
    ],
    name: "Bird of Paradise",
    description: "Faucibus lacus tincidunt molestie accumsan nibh non odio aenean molestie purus tristique sed tempor consequat risus tellus amet augue egestas mauris scelerisque donec ultrices. Sollicitudin facilisis massa pellentesque in ultrices enim nunc ac egestas elementum ut in ornare sit malesuada.",
    qty: 20,
    price: 249.90,
    seller_id: "seller_3",
    status: "active",
    pics: [
      "https://websitedemos.net/plant-shop-02/wp-content/uploads/sites/931/2021/08/plants-ecommerce-product-featured-img-4.jpg",
      "https://websitedemos.net/plant-shop-02/wp-content/uploads/sites/931/2021/08/plants-shop-product-gallery-img-12.jpg"
    ]
  },
  {
    categories: [
      { category_id: "112657c5-787a-4053-a9cc-ce3f650f7b60", name: "Air purifying" },
      { category_id: "1821e993-61d8-4cce-a993-7c38d1ca034d", name: "Medium Plants" }
    ],
    name: "Birdnest Japanese",
    description: "Faucibus lacus tincidunt molestie accumsan nibh non odio aenean molestie purus tristique sed tempor consequat risus tellus amet augue egestas mauris scelerisque donec ultrices. Sollicitudin facilisis massa pellentesque in ultrices enim nunc ac egestas elementum ut in ornare sit malesuada.",
    qty: 25,
    price: 84.90,
    seller_id: "seller_4",
    status: "active",
    pics: [
      "https://websitedemos.net/plant-shop-02/wp-content/uploads/sites/931/2021/08/plants-ecommerce-product-featured-img-8.jpg",
      "https://websitedemos.net/plant-shop-02/wp-content/uploads/sites/931/2021/08/plants-shop-product-gallery-img-20.jpg"
    ]
  },
  {
    categories: [
      { category_id: "e3944a66-96b8-443b-91e1-9c02f5de31e6", name: "Plant accessories" }
    ],
    name: "Bypass Secateur",
    description: "Faucibus lacus tincidunt molestie accumsan nibh non odio aenean molestie purus tristique sed tempor consequat risus tellus amet augue egestas mauris scelerisque donec ultrices. Sollicitudin facilisis massa pellentesque in ultrices enim nunc ac egestas elementum ut in ornare sit malesuada.",
    qty: 50,
    price: 48.90,
    seller_id: "seller_5",
    status: "active",
    pics: [
      "https://websitedemos.net/plant-shop-02/wp-content/uploads/sites/931/2021/08/plants-ecommerce-accessories-product-featured-img-3.jpg"
    ]
  },
  {
    categories: [
      { category_id: "42e7f44a-d25b-4514-b50c-be728d274d8a", name: "Herbs seeds" },
      { category_id: "1821e993-61d8-4cce-a993-7c38d1ca034d", name: "Medium Plants" },
      { category_id: "055bc69b-93b9-47a6-8381-b0d17f42300c", name: "Plant bundle" }
    ],
    name: "Calathea Beauty Star",
    description: "Faucibus lacus tincidunt molestie accumsan nibh non odio aenean molestie purus tristique sed tempor consequat risus tellus amet augue egestas mauris scelerisque donec ultrices. Sollicitudin facilisis massa pellentesque in ultrices enim nunc ac egestas elementum ut in ornare sit malesuada.",
    qty: 30,
    price: 79.90,
    seller_id: "seller_6",
    status: "active",
    pics: [
      "https://websitedemos.net/plant-shop-02/wp-content/uploads/sites/931/2021/08/plants-ecommerce-product-featured-img-7.jpg",
      "https://websitedemos.net/plant-shop-02/wp-content/uploads/sites/931/2021/08/plants-shop-product-gallery-img-5.jpg"
    ]
  },
  {
    categories: [
      { category_id: "42e7f44a-d25b-4514-b50c-be728d274d8a", name: "Herbs seeds" },
      { category_id: "d8be6a08-2dd2-4b5a-93f3-6095fd7f336e", name: "Large Plants" },
      { category_id: "db97ec8b-aaae-479e-a03f-45983c39461e", name: "Low maintenance" }
    ],
    name: "Calathea Rufibarba",
    description: "Faucibus lacus tincidunt molestie accumsan nibh non odio aenean molestie purus tristique sed tempor consequat risus tellus amet augue egestas mauris scelerisque donec ultrices. Sollicitudin facilisis massa pellentesque in ultrices enim nunc ac egestas elementum ut in ornare sit malesuada.",
    qty: 15,
    price: 109.90,
    seller_id: "seller_7",
    status: "active",
    pics: [
      "https://websitedemos.net/plant-shop-02/wp-content/uploads/sites/931/2021/08/plants-ecommerce-product-featured-img-18.jpg",
      "https://websitedemos.net/plant-shop-02/wp-content/uploads/sites/931/2021/08/plants-shop-product-gallery-img-3.jpg"
    ]
  },
  {
    categories: [
      { category_id: "112657c5-787a-4053-a9cc-ce3f650f7b60", name: "Air purifying" },
      { category_id: "31b3bca1-670a-41a1-b5fa-bdc42f4b28ea", name: "Indoor Plants" },
      { category_id: "d8be6a08-2dd2-4b5a-93f3-6095fd7f336e", name: "Large Plants" }
    ],
    name: "Dracaena Lisa",
    description: "Faucibus lacus tincidunt molestie accumsan nibh non odio aenean molestie purus tristique sed tempor consequat risus tellus amet augue egestas mauris scelerisque donec ultrices. Sollicitudin facilisis massa pellentesque in ultrices enim nunc ac egestas elementum ut in ornare sit malesuada.",
    qty: 20,
    price: 114.90,
    seller_id: "seller_8",
    status: "active",
    pics: [
      "https://websitedemos.net/plant-shop-02/wp-content/uploads/sites/931/2021/08/plants-ecommerce-product-featured-img-20.jpg",
      "https://websitedemos.net/plant-shop-02/wp-content/uploads/sites/931/2021/08/plants-shop-product-gallery-img-18.jpg"
    ]
  },
  {
    categories: [
      { category_id: "7146831f-7874-4040-ab37-aae78f759af8", name: "Ceramic pots" },
      { category_id: "42e7f44a-d25b-4514-b50c-be728d274d8a", name: "Herbs seeds" },
      { category_id: "1821e993-61d8-4cce-a993-7c38d1ca034d", name: "Medium Plants" }
    ],
    name: "Euphorbia Ingens",
    description: "Faucibus lacus tincidunt molestie accumsan nibh non odio aenean molestie purus tristique sed tempor consequat risus tellus amet augue egestas mauris scelerisque donec ultrices. Sollicitudin facilisis massa pellentesque in ultrices enim nunc ac egestas elementum ut in ornare sit malesuada.",
    qty: 25,
    price: 104.90,
    seller_id: "seller_9",
    status: "active",
    pics: [
      "https://websitedemos.net/plant-shop-02/wp-content/uploads/sites/931/2021/08/plants-ecommerce-product-featured-img-10.jpg",
      "https://websitedemos.net/plant-shop-02/wp-content/uploads/sites/931/2021/08/plants-shop-product-gallery-img-9.jpg"
    ]
  }
];

// Connect to MongoDB and seed data
mongoose
  .connect("mongodb+srv://sarahsalem9898:tCIooq7nagBwiJZm@angular-node-cluster.qaz70.mongodb.net/ecommerce", {
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
