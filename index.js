const express = require("express");
const fileUpload = require("express-fileupload");
const fs = require("fs");
const path = require("path");
const { APP_CONFIG } = require("./config/app.config");
const cors=require('cors');
const authenticationMiddleware = require("./middlewares/authentication.middleware");

//server
const app = express();


app.use(cors({
    origin: APP_CONFIG.CORS_ORIGIN|| 'http://localhost:4200',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'Accept'],
    credentials: true
}));

// middlewares
app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.use(
  fileUpload({
    limits: { fileSize: 50 * 1024 * 1024 },
    useTempFiles: false,
    preserveExtension: true,
  })
);


const routes = {
    public: {
        'clerks.controller.js': '/api/admin/clerk',
        'SellerAdmin.controller.js': '/api/admin/sellers',
        'category.controller.js': '/api/admin/category',
        'order.controller.js': '/api/order',
        'carts.controller.js': '/api/customer/cart',
       // 'products.controller.js': '/api/customer/product',
      //  'customer.product.controller.js':'/api/customer/product',
        'products.customer.controller.js': '/api/customer/product',
        'orders.customer.controller.js':'/api/customer/order',
    },
    protected: {
    }
};

// controller registrations
const controllersDirPath = path.join(__dirname, "controllers");
const controllersDirectory = fs.readdirSync(controllersDirPath);

for (const controllerFile of controllersDirectory) {
  if(routes.public[controllerFile]){
      const controller = require(path.join(controllersDirPath, controllerFile)); 
      app.use(routes.public[controllerFile],controller);

  }
}

for (const controllerFile of controllersDirectory) {
    if(routes.protected[controllerFile]){
        const controller = require(path.join(controllersDirPath, controllerFile)); 
        app.use(authenticationMiddleware);
        app.use(routes.protected[controllerFile],controller);
  
    }
  }



// export point
module.exports = app;
