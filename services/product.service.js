const productRepo = require("../repos/product.repo");

const getProducts = async () => {
    return await productRepo.getProducts();
};

const getProductsBySeller = async (sellerId) => {
    return await productRepo.getProductsBySeller(sellerId);
};

const addProduct = async (sellerId, productData) => {
    return await productRepo.addProduct(sellerId, productData);
};

const updateProduct = async (sellerId, productId, productData) => {
    return await productRepo.updateProduct(sellerId, productId, productData);
};

const deleteProduct = async (sellerId, productId) => {
    return await productRepo.deleteProduct(sellerId, productId);
};

module.exports = {
    getProducts,
    getProductsBySeller,
    addProduct,
    updateProduct,
    deleteProduct
};
