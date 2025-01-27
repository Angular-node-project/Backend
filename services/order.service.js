const orderrepo=require("../repos/order.repo");
const getorders=async()=>{
    return await orderrepo.getorders();
}
const getorderbystatus=async(status)=>{
    return await orderrepo.getorderbystatus(status);
}
const getorderbydid=async(orderid)=>{
    return await orderrepo.getorderbydid(orderid);
}
const acceptorder=async(orderid)=>{
    return await orderrepo.acceptorder(orderid);
}
const getorderbysellerid=async(sellerid)=>{
    return await orderrepo.getorderbysellerid(sellerid);
}
const getorderbyproductid=async(productid)=>{
    return await orderrepo.getorderbyproductid(productid);
}
module.exports={
    getorders,
    getorderbystatus,
    getorderbydid,
    acceptorder,
    getorderbysellerid,
    getorderbyproductid
}