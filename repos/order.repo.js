const order=require("../models/order.model");
const branchOrderModel=require("../models/branchOrder.model");

const getorders=async()=>{
    return order.find({});
}
const getorderbystatus=async(status)=>{
    return order.find({status:status});
}
const getorderbydid=async(orderid)=>{
    return order.find({order_id:orderid});
}
const ChangeOrderStatus=async(orderid,status)=>{
    return order.findOneAndUpdate({order_id:orderid},{status: status},{new:true});
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

    let sortQuery = { createdAt: -1 };
    if(governorate){
        query.governorate= {$regex: governorate, $options: 'i'}  ;
    }
    if(status)
    {
        query.status=status ;
    }
    
    const pipeline = [
        { $match: query },  
        {
            $lookup: {
                from: "customers",   
                localField: "customer_id",
                foreignField: "customer_id",
                as: "customer"
            }
        },
        { $unwind:{ path: "$customer", preserveNullAndEmptyArrays: true }}, 
        {
            $lookup:{
                from: "clerks",   
                localField: "cashier_id",
                foreignField: "clerk_id",
                as: "cashier"
            }
        },
        { $unwind: { path: "$cashier", preserveNullAndEmptyArrays: true } }, 
        { $skip: skip },       
        { $limit: limit },     
        {
            $project: {
                order_id:1,
                customer_id: 1,
                "customer.name": 1,
                 "customer.email": 1,
                cashier_id: 1,
                 "cashier.name": 1,
                  "cashier.email": 1,
                  address: 1,
                  governorate:1,
                  phone_number:1,
                  product:1,
                  status:1,
            }
        }
    ];
    if (Object.keys(sortQuery).length > 0) {
        pipeline.splice(1, 0, { $sort: sortQuery });
    }
    return await  order.aggregate(pipeline);
}


const countAllOrders=async(status)=>{
    const query={};

    if(status)
        {
            query.status=status ;
        }
    return await order.countDocuments(query);
}
const countOrdersBySellerId = async (sellerId) => {
    const query = { "product.seller_id": sellerId };
    const orders = await order.find(query).distinct('order_id');
    return orders.length;
}

const getCustomerOrders=async (customerId)=>{
    return order.find({customer_id:customerId},{})
    .sort({ createdAt: -1 });

}
const getOrdersBySellerIdPaginated = async (sellerId, page, limit) => {
    var skip = (page - 1) * limit;
    const query = { "product.seller_id": sellerId };

    const pipeline = [
        { $match: query },
        { $skip: skip },
        { $limit: limit },
        {
            $lookup: {
                from: "customers",
                localField: "customer_id",
                foreignField: "customer_id",
                as: "customer"
            }
        },
        { $unwind: { path: "$customer", preserveNullAndEmptyArrays: true } },
        {
            $lookup: {
                from: "clerks",
                localField: "cashier_id",
                foreignField: "clerk_id",
                as: "cashier"
            }
        },
        { $unwind: { path: "$cashier", preserveNullAndEmptyArrays: true } },
        {
            $project: {
                order_id: 1,
                customer_id: 1,
                "customer.name": 1,
                "customer.email": 1,
                cashier_id: 1,
                "cashier.name": 1,
                "cashier.email": 1,
                address: 1,
                governorate: 1,
                phone_number: 1,
                product: 1,
                status: 1,
            }
        }
    ];

    return await order.aggregate(pipeline);
}

const assignOrderToBranches=async (orderBranches)=>{
    var result= await branchOrderModel.insertMany(orderBranches);
    return result;
     
}




module.exports={
    getAllOrdersPaginated,
    countAllOrders,
    getorders,
    getorderbystatus,
    getorderbydid,
    ChangeOrderStatus,
    getorderbysellerid,
    getorderbyproductid,
    createOrder,
    getCustomerOrders,
    getOrdersBySellerIdPaginated,
    countOrdersBySellerId,
    assignOrderToBranches
}

