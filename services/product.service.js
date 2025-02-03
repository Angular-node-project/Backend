const productrepo = require("../repos/product.repo");
const productRequestRepo = require("../repos/productRequest.repo");

const createProduct = async (productData) => {
    return await productrepo.createProduct(productData);
}

const updateProduct = async (productId, productData) => {
    return await productrepo.updateProduct(productId, productData);
}

const getProducts = async () => {
    return await productrepo.getProducts();
}

const getProductsBySeller = async (sellerId) => {
    return await productrepo.getProductsBySeller(sellerId);
}

const addProduct = async (sellerId, productData) => {
    return await productrepo.addProduct(sellerId, productData);
}

const deleteProduct = async (sellerId, productId) => {
    return await productrepo.deleteProduct(sellerId, productId);
}

const getAllProductsPaginated = async (page = 1, limit = 6, sort = '', category = '', status = '') => {
    const products = await productrepo.getAllProductsPaginated(page, limit, sort, category, status);
    const totalProductsCount = await productrepo.countAllProducts(category, status);
    return {
        products,
        currentPage: parseInt(page),
        totalPages: Math.ceil(totalProductsCount / limit),
        totalProductsCount
    }
}

const getPaginatedActiveProductsService = async (page = 1, limit = 6, sort = '', category = '') => {
    const products = await productrepo.getActivatedProductsPaginated(page, limit, sort, category);
    const totalProductsCount = await productrepo.countActivatedProducts(category);
    return {
        products,
        currentPage: parseInt(page),
        totalPages: Math.ceil(totalProductsCount / limit),
        totalProductsCount
    }
}

const updateProductRequest = async (productId, updatedData) => {
    return await productrepo.updateProduct(productId, updatedData);
}

const getproductsbyStatus = async (status) => {
    return await productrepo.getproductsbyStatus(status);
}

const softdeleteproduct = async (productId) => {
    return await productrepo.softdeleteproduct(productId);
}

const restoreproduct = async (productId) => {
    return await productrepo.restoreproduct(productId);
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

module.exports = {
    getAllProductsPaginated,
    getProducts,
    updateProductRequest,
    createProduct,
    getProductbyid,
    getproductsbyStatus,
    softdeleteproduct,
    restoreproduct,
    deleteproductbysellerid,
    getProductsBySeller,
    addProduct,
    updateProduct,
    deleteProduct,
    getPaginatedActiveProductsService,
    createUpdateRequest // Export the new function
}
