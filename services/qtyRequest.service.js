const qtyRequestRepo= require("../repos/qtyRequest.repo");
const addQtyRequestService=async(newRequest)=>{
    return qtyRequestRepo.addQtyRequest(newRequest); 
}
module.exports={
    addQtyRequestService
}