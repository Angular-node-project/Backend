const productrepo = require("../repos/product.repo");
const createProduct=async(productData)=>{
    return await productrepo.createProduct(productData);
}
const updateProduct=async(productid,productData)=>{
    return await productrepo.updateProduct(productid,productData)
}
const getProducts = async () => {
    return await productRepo.getProducts();
};

const getProductsBySeller = async (sellerId) => {
    return await productRepo.getProductsBySeller(sellerId);
};

const addProduct = async (sellerId, productData) => {
    return await productRepo.addProduct(sellerId, productData);
};


const deleteProduct = async (sellerId, productId) => {
    return await productRepo.deleteProduct(sellerId, productId);
};



const getPaginatedActiveProductsService = async (page = 1, limit = 6,sort='',category='') => {
    const products = await productrepo.getActivatedProductsPaginated(page, limit,sort,category);
    const totalProductsCount = await productrepo.countActivatedProducts(category);
    return {
        products,
        currentPage: parseInt(page),
        totalPages: Math.ceil(totalProductsCount / limit),
        totalProductsCount
    }
}
const updateProductRequest=async(productid,updatedData)=>{
    return await productrepo.updateProduct(productid,updatedData )
}

const getproductsbyStatus = async (status) => {
    return await productrepo.getproductsbyStatus(status);
}
const softdeleteproduct = async (productid) => {
    return await productrepo.softdeleteproduct(productid)
}
const restoreproduct = async (productid) => {
    return await productrepo.restoreproduct(productid)
}
const getProductbyid = async (productid) => {
    return await productrepo.getProductbyid(productid)
}
const deleteproductbysellerid = async (sellerid) => {
    return await productrepo.deleteproductbysellerid(sellerid);
}

module.exports = {
 
     getProducts
     ,updateProductRequest
    ,createProduct
    , getProductbyid
    , getproductsbyStatus
    , softdeleteproduct
    , restoreproduct
    , deleteproductbysellerid,
    getProductsBySeller,
        addProduct,
       updateProduct,
       deleteProduct
    , getPaginatedActiveProductsService
}
