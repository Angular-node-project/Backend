const branchorderrepo=require("../repos/branchorder.repo");
const getALllBranchOrders=async()=>{
    return await branchorderrepo.getALllBranchOrders();
}
const getAllBrnachOrdersPaginated = async (page=1, limit=6, status='',search='',branch_id='') => {
   
    const brancheOrders=await branchorderrepo.getAllBrnachOrdersPaginated(page,limit,status,search,branch_id);
    const totalBrancheOrdersCount = await branchorderrepo.countAllBranchOrders(status,branch_id);
           return {
            brancheOrders,
               currentPage: parseInt(page),
               totalPages: Math.ceil(totalBrancheOrdersCount / limit),
               totalBrancheOrdersCount
           }
};
const changeBranchOrderStatusService=async(order_Id,branch_Id,status)=>{
    await branchorderrepo.changeBranchOrderStatus(order_Id,branch_Id,status);
}
const cancelBranchOrderService=async(order_id,branch_id)=>{
    await branchorderrepo.cancelOrderBranch(order_id,branch_id);
}


module.exports={
    getALllBranchOrders,
    getAllBrnachOrdersPaginated,
    changeBranchOrderStatusService,
    cancelBranchOrderService
   
}