const orderRepo=require("../repos/order.repo");
const cartRepo=require("../repos/cart.repo");
const sellerRepo=require("../repos/seller.repo");
const productRepo=require("../repos/product.repo");
const getorders=async()=>{
    return await orderRepo.getorders();
}
const getorderbystatus=async(status)=>{
    return await orderRepo.getorderbystatus(status);
}
const getorderbydid=async(orderid)=>{
    return await orderRepo.getorderbydid(orderid);
}
const ChangeOrderStatus=async(orderid,status)=>{
    return await orderRepo.ChangeOrderStatus(orderid,status);
}
const getorderbysellerid=async(sellerid)=>{
    return await orderRepo.getorderbysellerid(sellerid);
}
const getorderbyproductid=async(productid)=>{
    return await orderRepo.getorderbyproductid(productid);
}

const addOrder=async(orderData)=>{

    const customerId=orderData.customer_id

    await cartRepo.deleteCart(customerId);

    
    const prices={}
    const products={}

    orderData.product.forEach(element => {
        if(isNaN(prices[element.seller_id]))
            prices[element.seller_id]=0;
            prices[element.seller_id]+=(element.qty*element.price)
        products[element.product_id]=element.qty
    });

        await sellerRepo.increaseSellerWallet(prices);
        await productRepo.decreaseStock(products);

    let order= await orderRepo.createOrder(orderData);
    return {
        success: true,
        data: order
    }; 
}
const addCashierOrder=async(orderData)=>{
    
    const prices={}
    const products={}

    orderData.product.forEach(element => {
        if(isNaN(prices[element.seller_id]))
            prices[element.seller_id]=0;
            prices[element.seller_id]+=(element.qty*element.price)
        products[element.product_id]=element.qty
    });

        await sellerRepo.increaseSellerWallet(prices);
        await productRepo.decreaseStock(products);

    let order= await orderRepo.createOrder(orderData);
    return {
        success: true,
        data: order
    }; 
}
const getAllordersPaginated = async (page = 1, limit = 6,status='',governorate='') => {
    const orders = await orderRepo.getAllOrdersPaginated(page, limit,status,governorate);
    const totalOrderssCount = await orderRepo.countAllOrders(status);
    return {
        orders,
        currentPage: parseInt(page),
        totalPages: Math.ceil(totalOrderssCount / limit),
        totalOrderssCount
    }
}

const getCustomerOrders=async(customerId)=>{
    let orders= await orderRepo.getCustomerOrders(customerId);
    
    return orders
}



module.exports={
    getAllordersPaginated,
    getorders,
    getorderbystatus,
    getorderbydid,
    ChangeOrderStatus,
    getorderbysellerid,
    getorderbyproductid,
    addOrder,
    getCustomerOrders,
    addCashierOrder
}


