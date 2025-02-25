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

  

    'products.seller.controller.js': '/api/seller/product',
    'category.seller.controller.js': '/api/seller/category',
    'products.customer.controller.js': '/api/customer/product',
    'account.customer.controller.js': '/api/customer/account',
    
    
    'orders.seller.controller.js': '/api/seller/order',
    'account.seller.controller.js':'/api/seller/account',
    'account.clerkBranch.controller.js':'/api/clerkBranch/account',
    
    'seller.analysis.controller.js':'/api/seller/analysis',
    'customerservice.customer.controller.js':'/api/customer/customerservice'
  },
  protected: {
    'carts.controller.js': { path: '/api/customer/cart', userType: "customer" },
    'orders.customer.controller.js': { path: '/api/customer/order', userType: "customer" },
    'role.admin.controller.js': { path: '/api/admin/role', userType: "admin" },
    'clerks.Admin.controller.js': {path:'/api/admin/clerk',userType:"admin"},
    'Seller.Admin.controller.js': {path:'/api/admin/sellers',userType:"admin"},
    'category.Admin.controller.js':  {path:'/api/admin/category',userType:"admin"},
    'branch.admin.controller.js': {path:'/api/admin/branch',userType:"admin"},
    'clerkBranch.admin.controller.js':{path: '/api/admin/clerkBranch',userType:"admin"},
    'products.Admin.controller.js': {path:'/api/admin/product',userType:"admin"},
    'order.Admin.controller.js': {path:'/api/admin/order',userType:"admin"},
    'account.admin.controller.js': {path:'/api/admin/account',userType:"admin"},
    'customerservice.admin.controller.js': {path:'/api/admin/customerservice',userType:"admin"},
    'admin.analysis.controller.js':{path:'/api/admin/analysis',userType:"admin"},
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
