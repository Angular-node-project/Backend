const { dropSearchIndex } = require("../models/product.model");
const productrepo = require("../repos/product.repo");

const createProduct = async (productData) => {
    return await productrepo.createProduct(productData);
}

const updateProduct = async (productId, productData) => {
    return await productrepo.updateProduct(productId, productData);
}
const updateReturnedProduct = async (productId, Updatedqty) => {
    return await productrepo.updateReturnedProduct(productId, Updatedqty);
}

const getProducts = async () => {
    return await productrepo.getProducts();
}

const getProductsBySeller = async (sellerId) => {
    return await productrepo.getProductsBySeller(sellerId);
}
const getProductsBySellerPaginated = async (sellerId, page = 1, limit = 8, sort, category, status, search) => { 
    const products= await productrepo.getProductsBySellerPaginated(sellerId, page, limit, sort, category, status, search);
    const totalProductsCount = await productrepo.countSellerProducts(sellerId);
    return {
        products,
        currentPage: parseInt(page),
        totalPages: Math.ceil(totalProductsCount / limit),
        totalProductsCount
    }
}

const addProduct = async (sellerId, productData) => {
    return await productrepo.addProduct(sellerId, productData);
}

const deleteProduct = async (sellerId, productId) => {
    return await productrepo.deleteProduct(sellerId, productId);
}

const getAllProductsPaginated = async (page = 1, limit = 8, sort = '', category = '', status = '',search='') => {
    const products = await productrepo.getAllProductsPaginated(page, limit, sort, category, status,search);
    const totalProductsCount = await productrepo.countAllProducts(category, status);
    return {
        products,
        currentPage: parseInt(page),
        totalPages: Math.ceil(totalProductsCount / limit),
        totalProductsCount
    }
}

const getPaginatedActiveProductsService = async (page = 1, limit = 6, sort = '', category = '',seller='',search='') => {
    const products = await productrepo.getActivatedProductsPaginated(page, limit, sort, category,seller,search);
    const totalProductsCount = await productrepo.countActivatedProducts(category);
    return {
        products,
        currentPage: parseInt(page),
        totalPages: Math.ceil(totalProductsCount / limit),
        totalProductsCount
    }
}

const updateProductRequest = async (productId, updatedData) => {
    return await productrepo.updateProductRequest(productId, updatedData);
}

const getproductsbyStatus = async (status) => {
    return await productrepo.getproductsbyStatus(status);
}

const softdeleteproduct = async (productId) => {
    return await productrepo.softdeleteproduct(productId);
}

const ChangeStatusproduct = async (productId,status) => {
    return await productrepo.ChangeStatusproduct(productId,status);
}

const getProductbyid = async (productId) => {
    return await productrepo.getProductbyid(productId);
}

const deleteproductbysellerid = async (sellerId) => {
    return await productrepo.deleteproductbysellerid(sellerId);
}

// New function to create an update request
const createUpdateRequest = async (sellerId, productId, updateData) => {
    return await productRequestRepo.createUpdateRequest(sellerId, productId, updateData);
}

const addReviewService=async(productId,customer,review)=>{
    return await productrepo.addReview(productId,customer,review);
}


module.exports = {
    getAllProductsPaginated,
    getProducts,
    updateProductRequest,
    createProduct,
    getProductbyid,
    getproductsbyStatus,
    softdeleteproduct,
    ChangeStatusproduct,
    deleteproductbysellerid,
    getProductsBySeller,
    addProduct,
    updateProduct,
    deleteProduct,
    getPaginatedActiveProductsService,
    addReviewService,
    createUpdateRequest,
    getProductsBySellerPaginated ,
    updateReturnedProduct
}
