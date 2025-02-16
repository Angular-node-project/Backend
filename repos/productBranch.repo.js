const productBranchModel = require('../models/productBranch.model');

const addUpdateBranchesQty=async(product_id,branchesQty)=>{
   await productBranchModel.deleteMany({product_id:product_id});
   const newData=branchesQty.map(branch=>({
         product_id,
         ...branch
   })) 
 var result=await productBranchModel.insertMany(newData);
 return result

}
module.exports={addUpdateBranchesQty}