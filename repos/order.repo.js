const order=require("../models/order.model");
const getorders=async()=>{
    return order.find({});
}
const getorderbystatus=async(status)=>{
    return order.find({status:status});
}
const getorderbydid=async(orderid)=>{
    return order.find({order_id:orderid});
}
const acceptorder=async(orderid)=>{
    return order.findOneAndUpdate({order_id:orderid},{status: "processing"},{new:true});
}
const getorderbysellerid=async(sellerid)=>{
    return order.find({ "product.seller_id":sellerid});
}
const getorderbyproductid=async(productid)=>{
    return order.find({ "product.product_id":productid});
}
module.exports={
    getorders,
    getorderbystatus,
    getorderbydid,
    acceptorder,
    getorderbysellerid,
    getorderbyproductid
}