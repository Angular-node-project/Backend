const orderRepo=require("../repos/order.repo");
const cartRepo=require("../repos/cart.repo");
const getorders=async()=>{
    return await orderRepo.getorders();
}
const getorderbystatus=async(status)=>{
    return await orderRepo.getorderbystatus(status);
}
const getorderbydid=async(orderid)=>{
    return await orderRepo.getorderbydid(orderid);
}
const acceptorder=async(orderid)=>{
    return await orderRepo.acceptorder(orderid);
}
const getorderbysellerid=async(sellerid)=>{
    return await orderRepo.getorderbysellerid(sellerid);
}
const getorderbyproductid=async(productid)=>{
    return await orderRepo.getorderbyproductid(productid);
}

const addOrder=async(orderData)=>{

    const customerId=orderData.customer_id

    const test=await cartRepo.deleteCart(customerId);

    console.log(test);

    return await orderRepo.createOrder(orderData);
}
module.exports={
    getorders,
    getorderbystatus,
    getorderbydid,
    acceptorder,
    getorderbysellerid,
    getorderbyproductid,
    addOrder
}


