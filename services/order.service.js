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
const getAllordersPaginated = async (page = 1, limit = 6,status='',governorate='') => {
    const orders = await orderRepo.getAllOrdersPaginated(page, limit,status,governorate);
    const totalOrderssCount = await orderRepo.countAllOrders(status,governorate);
    return {
        orders,
        currentPage: parseInt(page),
        totalPages: Math.ceil(totalOrderssCount / limit),
        totalOrderssCount
    }
}
module.exports={
    getAllordersPaginated,
    getorders,
    getorderbystatus,
    getorderbydid,
    acceptorder,
    getorderbysellerid,
    getorderbyproductid,
    addOrder
}


