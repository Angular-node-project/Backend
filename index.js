const express = require("express");
const fileUpload = require("express-fileupload");
const fs = require("fs");
const path = require("path");
const { APP_CONFIG } = require("./config/app.config");
const cors = require('cors');
const { authenticationMiddleware, userTypeAccessMiddleware } = require("./middlewares/authentication.middleware");

//server
const app = express();


app.use(cors({
  origin: APP_CONFIG.CORS_ORIGIN || 'http://localhost:4200',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'PATCH'],
  allowedHeaders: ['Content-Type', 'Authorization', 'Accept'],
  credentials: true
}));

// middlewares
app.use(express.json({ limit: "50mb" }))
app.use(express.urlencoded({ extended: true, limit: "50mb" }));
app.use(
  fileUpload({
    limits: { fileSize: 50 * 1024 * 1024 },
    useTempFiles: false,
    preserveExtension: true,
  })
);


const routes = {
  public: {

    'Seller.Admin.controller.js': '/api/admin/sellers',
    'category.Admin.controller.js': '/api/admin/category',
    'branch.admin.controller.js': '/api/admin/branch',
    'clerkBranch.admin.controller.js': '/api/admin/clerkBranch',
    'products.Admin.controller.js': '/api/admin/product',
    'order.Admin.controller.js': '/api/admin/order',
    
    'products.seller.controller.js': '/api/seller/product',
    'category.seller.controller.js': '/api/seller/category',
    'products.customer.controller.js': '/api/customer/product',
    'account.customer.controller.js': '/api/customer/account',
    'account.admin.controller.js': '/api/admin/account',
    'customerservice.admin.controller.js': '/api/admin/customerservice',
    'orders.seller.controller.js': '/api/seller/order',
    'account.seller.controller.js':'/api/seller/account',
    'account.clerkBranch.controller.js':'/api/clerkBranch/account',
    'admin.analysis.controller.js':'/api/admin/analysis',
    'seller.analysis.controller.js':'/api/seller/analysis',
  },
  protected: {
    'carts.controller.js': { path: '/api/customer/cart', userType: "customer" },
    'orders.customer.controller.js': { path: '/api/customer/order', userType: "customer" },
    'role.admin.controller.js': { path: '/api/admin/role', userType: "admin" },
    'clerks.Admin.controller.js': {path:'/api/admin/clerk',userType:"admin"},
    'products.clerkBranch.controller.js':{path:'/api/clerkBranch/products',userType:"clerkBranch"},
    'orders.cashier.controller.js':{path:'/api/clerkBranch/cashier/order',userType:"clerkBranch"},
   'branchorder.clerkBranch.controller.js':{path:'/api/clerkBranch/branchOrder',userType:"clerkBranch"},
  
  }
};

// controller registrations
const controllersDirPath = path.join(__dirname, "controllers");
const controllersDirectory = fs.readdirSync(controllersDirPath);

for (const controllerFile of controllersDirectory) {
  if (routes.public[controllerFile]) {
    const controller = require(path.join(controllersDirPath, controllerFile));
    app.use(routes.public[controllerFile], controller);

  }
}

for (const controllerFile of controllersDirectory) {
  if (routes.protected[controllerFile]) {
    const { path: routePath, userType } = routes.protected[controllerFile]
    const controller = require(path.join(controllersDirPath, controllerFile));
    app.use(routePath,userTypeAccessMiddleware(userType), controller);

  }
}



// export point
module.exports = app;
