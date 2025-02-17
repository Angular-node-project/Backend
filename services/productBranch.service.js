const productBranchRepo= require('../repos/productBranch.repo');

const addUpdateBranchesQtyService=async(product_id,newBranchesQty)=>{
    return productBranchRepo.addUpdateBranchesQty(product_id,newBranchesQty);
} 

const getAllProductsByBranchIdPaginated = async (branch_id,page = 1, limit = 8,search='',status) => {
    const products = await productBranchRepo.getAllProductsByBranchId(branch_id,page,limit,search,status);
    const totalProductsCount = await productBranchRepo.countProductsByBranch(branch_id,search,status);
    return {
        products,
        currentPage: parseInt(page),
        totalPages: Math.ceil(totalProductsCount / limit),
        totalProductsCount
    }
}

module.exports={
    addUpdateBranchesQtyService,
    getAllProductsByBranchIdPaginated
}