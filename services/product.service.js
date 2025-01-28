const productrepo=require("../repos/product.repo");
const getProducts=async()=>{
    return await productrepo.getProducts()
}
const getPaginatedActiveProductsService=async(page=1,limit=6)=>{
const products=await productrepo.getActivatedProductsPaginated(page,limit);
const totalProductsCount= await productrepo.countActivatedProducts();
return {
    products,
    currentPage:parseInt(page),
    totalPages:Math.ceil(totalProductsCount/limit),
    totalProductsCount
}
}

module.exports={getProducts,getPaginatedActiveProductsService}