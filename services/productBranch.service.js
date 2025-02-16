const productBranchRepo= require('../repos/productBranch.repo');

const addUpdateBranchesQtyService=async(product_id,newBranchesQty)=>{
    return productBranchRepo.addUpdateBranchesQty(product_id,newBranchesQty);
} 
module.exports={addUpdateBranchesQtyService}