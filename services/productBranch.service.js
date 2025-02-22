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
const getBrancheaBYProductIdsService=async(productdIds)=>{
    return await productBranchRepo.getBranchesBtProductIds(productdIds);
}
const UpdateReuqestQtyService=async(productId,Updatedqty)=>{
   var result= await productBranchRepo.UpdateReuqestQty(productId,Updatedqty)
   return result;
}
const getProductBranchbyIdService=async(productId,branchId)=>{
    return await productBranchRepo.getProductBranchbyId(productId,branchId);
}
const decreaseProductByBranchId=async (product_Id, branch_Id, qty)=>{
    return await productBranchRepo.decreaseProductByBranchId(product_Id,branch_Id,qty);
}


module.exports={
    addUpdateBranchesQtyService,
    getAllProductsByBranchIdPaginated,
    getBrancheaBYProductIdsService,
    UpdateReuqestQtyService,
    getProductBranchbyIdService,
    decreaseProductByBranchId
}