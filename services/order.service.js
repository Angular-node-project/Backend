const orderRepo=require("../repos/order.repo");
const cartRepo=require("../repos/cart.repo");
const addOrder=async(orderData)=>{

    const customerId=orderData.customer_id

    const test=await cartRepo.deleteCart(customerId);

    
    const prices={}
    // console.log(test);
    // console.log("This is Products");
    // console.log(orderData.product);

    orderData.product.forEach(element => {
        if(isNaN(prices[element.seller_id]))
            prices[element.seller_id]=0;
            prices[element.seller_id]+=(element.qty*element.price)
    });

    
    console.log(prices)


    return await orderRepo.createOrder(orderData);
}


module.exports={addOrder}