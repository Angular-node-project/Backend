const productrepo=require("../repos/product.repo");
const getProducts=async()=>{
    return await productrepo.getProducts()
}

module.exports={getProducts}