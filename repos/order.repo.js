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
const createOrder=async(data)=>{

    return order.create(data);
}
const getAllOrdersPaginated=async(page,limit,status,governorate)=>{
    var skip =(page-1)*limit;
    const query={};

    if(governorate){
        query.governorate=governorate ;
    }
    if(status)
    {
        query.status=status ;
    }
    return await  order.find(query)
                         .skip(skip)
                         .limit(limit)
                         .exec();  
}


const countAllOrders=async(status,governorate)=>{
    const query={};
    if(governorate){
        query.governorate=governorate ;
    }
    if(status)
        {
            query.status=status ;
        }
    return await order.countDocuments(query);
}

const getCustomerOrders=async (customerId)=>{
    return order.find({customer_id:customerId},{})
    .sort({ createdAt: -1 });

}


module.exports={
    getAllOrdersPaginated,
    countAllOrders,
    getorders,
    getorderbystatus,
    getorderbydid,
    acceptorder,
    getorderbysellerid,
    getorderbyproductid,
    createOrder,
    getCustomerOrders
}

