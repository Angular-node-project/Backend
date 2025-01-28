const orderRepo=require("../repos/order.repo");
const cartRepo=require("../repos/cart.repo");
const addOrder=async(orderData)=>{

    const customerId=orderData.customer_id

    const test=await cartRepo.deleteCart(customerId);

    console.log(test);




    return await orderRepo.createOrder(orderData);
}


module.exports={addOrder}