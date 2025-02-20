const mongoose = require("mongoose");
const Product = require("../models/product.model"); // Adjust the path as necessary

// Array of product objects
const products = [
  {
    categories: [
      { category_id: "a625b4b7-fe50-4d7b-a8b0-49692a984200", name: "Air purifying" },
      { category_id: "9ee9777d-491a-4830-8ce4-57cafd25c5b1", name: "Large Plants" },
      { category_id: "a8b72cab-57f1-49c2-82e8-9317e0b52b05", name: "Low maintenance" }
    ],
    name: "Alocasia Regal Shield",
    description: "Faucibus lacus tincidunt molestie accumsan nibh non odio aenean molestie purus tristique sed tempor consequat risus tellus amet augue egestas mauris scelerisque donec ultrices. Sollicitudin facilisis massa pellentesque in ultrices enim nunc ac egestas elementum ut in ornare sit malesuada.",
    qty: 30,
    price: 204.90,
    seller_id: "f4385b81-7c61-4f62-9bb6-0f542ccdfbfb",
    status: "pending",
    pics: [
      "https://websitedemos.net/plant-shop-02/wp-content/uploads/sites/931/2021/08/plants-ecommerce-product-featured-img-17.jpg",
      "https://websitedemos.net/plant-shop-02/wp-content/uploads/sites/931/2021/08/plants-shop-product-gallery-img-7.jpg"
    ]
  },
  {
    categories: [
      { category_id: "a625b4b7-fe50-4d7b-a8b0-49692a984200", name: "Air purifying" },
      { category_id: "fbb1ba6a-1d06-435e-abdf-f59788ec143a", name: "Herbs seeds" },
      { category_id: "9ee9777d-491a-4830-8ce4-57cafd25c5b1", name: "Large Plants" }
    ],
    name: "Aralia Ming",
    description: "Faucibus lacus tincidunt molestie accumsan nibh non odio aenean molestie purus tristique sed tempor consequat risus tellus amet augue egestas mauris scelerisque donec ultrices. Sollicitudin facilisis massa pellentesque in ultrices enim nunc ac egestas elementum ut in ornare sit malesuada.",
    qty: 40,
    price: 284.90,
    seller_id: "f4385b81-7c61-4f62-9bb6-0f542ccdfbfb",
    status: "pending",
    pics: [
      "https://websitedemos.net/plant-shop-02/wp-content/uploads/sites/931/2021/08/plants-ecommerce-product-featured-img-19.jpg",
      "https://websitedemos.net/plant-shop-02/wp-content/uploads/sites/931/2021/08/plants-shop-product-gallery-img-10.jpg"
    ]
  },
  {
    categories: [
      { category_id: "36339889-05fd-49e0-b0ce-ad64ffb62be6", name: "Ceramic pots" },
      { category_id: "9ee9777d-491a-4830-8ce4-57cafd25c5b1", name: "Large Plants" },
      { category_id: "ec52a868-b3a1-4f91-9978-e6879da59928", name: "Plant bundle" }
    ],
    name: "Bird of Paradise",
    description: "Faucibus lacus tincidunt molestie accumsan nibh non odio aenean molestie purus tristique sed tempor consequat risus tellus amet augue egestas mauris scelerisque donec ultrices. Sollicitudin facilisis massa pellentesque in ultrices enim nunc ac egestas elementum ut in ornare sit malesuada.",
    qty: 20,
    price: 249.90,
    seller_id: "f4385b81-7c61-4f62-9bb6-0f542ccdfbfb",
    status: "pending",
    pics: [
      "https://websitedemos.net/plant-shop-02/wp-content/uploads/sites/931/2021/08/plants-ecommerce-product-featured-img-4.jpg",
      "https://websitedemos.net/plant-shop-02/wp-content/uploads/sites/931/2021/08/plants-shop-product-gallery-img-12.jpg"
    ]
  },
  {
    categories: [
      { category_id: "a625b4b7-fe50-4d7b-a8b0-49692a984200", name: "Air purifying" },
      { category_id: "e474547a-97a8-4f54-b059-0f7cf9935f23", name: "Medium Plants" }
    ],
    name: "Birdnest Japanese",
    description: "Faucibus lacus tincidunt molestie accumsan nibh non odio aenean molestie purus tristique sed tempor consequat risus tellus amet augue egestas mauris scelerisque donec ultrices. Sollicitudin facilisis massa pellentesque in ultrices enim nunc ac egestas elementum ut in ornare sit malesuada.",
    qty: 25,
    price: 84.90,
    seller_id: "f4385b81-7c61-4f62-9bb6-0f542ccdfbfb",
    status: "pending",
    pics: [
      "https://websitedemos.net/plant-shop-02/wp-content/uploads/sites/931/2021/08/plants-ecommerce-product-featured-img-8.jpg",
      "https://websitedemos.net/plant-shop-02/wp-content/uploads/sites/931/2021/08/plants-shop-product-gallery-img-20.jpg"
    ]
  },
  {
    categories: [
      { category_id: "3b02b479-79f0-44a1-92cb-1403178b2318", name: "Plant accessories" }
    ],
    name: "Bypass Secateur",
    description: "Faucibus lacus tincidunt molestie accumsan nibh non odio aenean molestie purus tristique sed tempor consequat risus tellus amet augue egestas mauris scelerisque donec ultrices. Sollicitudin facilisis massa pellentesque in ultrices enim nunc ac egestas elementum ut in ornare sit malesuada.",
    qty: 50,
    price: 48.90,
    seller_id: "f4385b81-7c61-4f62-9bb6-0f542ccdfbfb",
    status: "pending",
    pics: [
      "https://websitedemos.net/plant-shop-02/wp-content/uploads/sites/931/2021/08/plants-ecommerce-accessories-product-featured-img-3.jpg"
    ]
  },
  {
    categories: [
      { category_id: "fbb1ba6a-1d06-435e-abdf-f59788ec143a", name: "Herbs seeds" },
      { category_id: "e474547a-97a8-4f54-b059-0f7cf9935f23", name: "Medium Plants" },
      { category_id: "ec52a868-b3a1-4f91-9978-e6879da59928", name: "Plant bundle" }
    ],
    name: "Calathea Beauty Star",
    description: "Faucibus lacus tincidunt molestie accumsan nibh non odio aenean molestie purus tristique sed tempor consequat risus tellus amet augue egestas mauris scelerisque donec ultrices. Sollicitudin facilisis massa pellentesque in ultrices enim nunc ac egestas elementum ut in ornare sit malesuada.",
    qty: 30,
    price: 79.90,
    seller_id: "f4385b81-7c61-4f62-9bb6-0f542ccdfbfb",
    status: "pending",
    pics: [
      "https://websitedemos.net/plant-shop-02/wp-content/uploads/sites/931/2021/08/plants-ecommerce-product-featured-img-7.jpg",
      "https://websitedemos.net/plant-shop-02/wp-content/uploads/sites/931/2021/08/plants-shop-product-gallery-img-5.jpg"
    ]
  },
  {
    categories: [
      { category_id: "fbb1ba6a-1d06-435e-abdf-f59788ec143a", name: "Herbs seeds" },
      { category_id: "9ee9777d-491a-4830-8ce4-57cafd25c5b1", name: "Large Plants" },
      { category_id: "a8b72cab-57f1-49c2-82e8-9317e0b52b05", name: "Low maintenance" }
    ],
    name: "Calathea Rufibarba",
    description: "Faucibus lacus tincidunt molestie accumsan nibh non odio aenean molestie purus tristique sed tempor consequat risus tellus amet augue egestas mauris scelerisque donec ultrices. Sollicitudin facilisis massa pellentesque in ultrices enim nunc ac egestas elementum ut in ornare sit malesuada.",
    qty: 15,
    price: 109.90,
    seller_id: "f4385b81-7c61-4f62-9bb6-0f542ccdfbfb",
    status: "pending",
    pics: [
      "https://websitedemos.net/plant-shop-02/wp-content/uploads/sites/931/2021/08/plants-ecommerce-product-featured-img-18.jpg",
      "https://websitedemos.net/plant-shop-02/wp-content/uploads/sites/931/2021/08/plants-shop-product-gallery-img-3.jpg"
    ]
  },
  {
    categories: [
      { category_id: "a625b4b7-fe50-4d7b-a8b0-49692a984200", name: "Air purifying" },
      { category_id: "1521b763-3934-4b88-bd53-6ce4a5636cfa", name: "Indoor Plants" },
      { category_id: "9ee9777d-491a-4830-8ce4-57cafd25c5b1", name: "Large Plants" }
    ],
    name: "Dracaena Lisa",
    description: "Faucibus lacus tincidunt molestie accumsan nibh non odio aenean molestie purus tristique sed tempor consequat risus tellus amet augue egestas mauris scelerisque donec ultrices. Sollicitudin facilisis massa pellentesque in ultrices enim nunc ac egestas elementum ut in ornare sit malesuada.",
    qty: 20,
    price: 114.90,
    seller_id: "f4385b81-7c61-4f62-9bb6-0f542ccdfbfb",
    status: "pending",
    pics: [
      "https://websitedemos.net/plant-shop-02/wp-content/uploads/sites/931/2021/08/plants-ecommerce-product-featured-img-20.jpg",
      "https://websitedemos.net/plant-shop-02/wp-content/uploads/sites/931/2021/08/plants-shop-product-gallery-img-18.jpg"
    ]
  },
  {
    categories: [
      { category_id: "36339889-05fd-49e0-b0ce-ad64ffb62be6", name: "Ceramic pots" },
      { category_id: "fbb1ba6a-1d06-435e-abdf-f59788ec143a", name: "Herbs seeds" },
      { category_id: "e474547a-97a8-4f54-b059-0f7cf9935f23", name: "Medium Plants" }
    ],
    name: "Euphorbia Ingens",
    description: "Faucibus lacus tincidunt molestie accumsan nibh non odio aenean molestie purus tristique sed tempor consequat risus tellus amet augue egestas mauris scelerisque donec ultrices. Sollicitudin facilisis massa pellentesque in ultrices enim nunc ac egestas elementum ut in ornare sit malesuada.",
    qty: 25,
    price: 104.90,
    seller_id: "f4385b81-7c61-4f62-9bb6-0f542ccdfbfb",
    status: "pending",
    pics: [
      "https://websitedemos.net/plant-shop-02/wp-content/uploads/sites/931/2021/08/plants-ecommerce-product-featured-img-10.jpg",
      "https://websitedemos.net/plant-shop-02/wp-content/uploads/sites/931/2021/08/plants-shop-product-gallery-img-9.jpg"
    ]
  }
];

// Connect to MongoDB and seed data
mongoose
  .connect("mongodb+srv://sarahsalem9898:tCIooq7nagBwiJZm@angular-node-cluster.qaz70.mongodb.net/ecommerce-stage", {
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
