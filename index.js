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
        'clerks.Admin.controller.js': '/api/admin/clerk',
        'seller.Admin.controller.js': '/api/admin/sellers',
        'category.Admin.controller.js': '/api/admin/category',
        'products.Admin.controller.js': '/api/admin/product',
        'order.Admin.controller.js': '/api/admin/order',
        'carts.controller.js': '/api/customer/cart',
        'products.seller.controller.js': '/api/seller/product',
        'products.customer.controller.js': '/api/customer/product',
        'orders.customer.controller.js':'/api/customer/order',
        'account.customer.controller.js':'/api/customer/account',
        'account.admin.controller.js':'/api/admin/account',
        'customerservice.admin.controller.js':'/api/admin/customerservice',
        'orders.seller.controller.js':'/api/seller/order',
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
