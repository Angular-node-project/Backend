const order=require("../models/order.model");

const createOrder=async(data)=>{

    return order.create(data);
}

module.exports={createOrder}
