const productrepo = require("../repos/product.repo");
const getProducts = async () => {
    return await productrepo.getProducts()
}
const getPaginatedActiveProductsService = async (page = 1, limit = 6) => {
    const products = await productrepo.getActivatedProductsPaginated(page, limit);
    const totalProductsCount = await productrepo.countActivatedProducts();
    return {
        products,
        currentPage: parseInt(page),
        totalPages: Math.ceil(totalProductsCount / limit),
        totalProductsCount
    }
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
    , getProductbyid
    , getproductsbyStatus
    , softdeleteproduct
    , restoreproduct
    , deleteproductbysellerid
    , getProducts
    , getPaginatedActiveProductsService
}
