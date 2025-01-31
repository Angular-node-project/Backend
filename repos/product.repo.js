const product = require("../models/product.model");

const getProducts = async () => {
    return product.find({}, {});
}

const selectedProducts = async (data) => {
    return await product.find({ product_id: { $in: data } });
}

const getProductsBySeller = async (sellerId) => {
    const pro= await product.find({ seller_id: sellerId },{});
    console.log(pro);
    return pro;
}

const addProduct = async (sellerId, productData) => {
    const newProduct = new product({ ...productData, seller_id: sellerId, status: 'pending' });
    return await newProduct.save();
}


const updateProduct = async (sellerId, productId, productData) => {
    return await product.findOneAndUpdate(
        { product_id: productId, seller_id: sellerId },
        { $set: productData },
        { new: true }
    );
}

const deleteProduct = async (sellerId, productId) => {
    return await product.findOneAndUpdate(
        { product_id: productId, seller_id: sellerId },
        { $set: { status: 'inactive' } },
        { new: true }
    );
}

module.exports = {
    getProducts,
    selectedProducts,
    getProductsBySeller,
    addProduct,
    updateProduct,
    deleteProduct
}

