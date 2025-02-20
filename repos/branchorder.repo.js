const branchordermodel=require("../models/branchOrder.model");
const getALllBranchOrders=async()=>{
    return  branchordermodel.find({});
}
const getAllBrnachOrdersPaginated = async (page, limit, status,search,branch_id) => {
    var skip = (page - 1) * limit;
    const query = {};

    let sortQuery = { createdAt: -1 };
    if (branch_id) {
        query["branch.branch_id"] = { $regex: branch_id, $options: "i" };

    }

    if (search) {
        query["product.name"] = { $regex: search, $options: "i" };

    }
    
   
    if (status) {
        query.status = status;
    }
   

    const pipeline = [
        { $match: query },
        { $sort: sortQuery },
        {
            $lookup: {
                from: "products",
                localField: "product.product_id",
                foreignField: "product_id",
                as: "productDetails"
            }
        },
        {
            $group: {
                _id: { order_id: "$order_id", branch_id: "$branch.branch_id" },
                order_id: { $first: "$order_id" },
                branch: { $first: "$branch" }, 
                status: { $first: "$status" }, 

                orders: {
                    $push: {
                        branchOrder_id: "$branchOrder_id",
                     
                        qty: "$qty",
                        product: {
                            product_id: "$product.product_id",
                            name: "$product.name",
                            pics: { $arrayElemAt: ["$productDetails.pics", 0] },
                            price: { $arrayElemAt: ["$productDetails.price", 0] }
                        }
                    }
                }
            }
        },
        { $skip: skip },
        { $limit: limit }
    ];
    
    return await branchordermodel.aggregate(pipeline);
    
}    

const createOrdersBranch = async (data) => {
    return branchordermodel.create(data);
}

const countAllBranchOrders=async(status)=>{
    const query={};

    if(status)
        {
            query.status=status ;
        }
    return await branchordermodel.countDocuments(query);
}
module.exports={
    getALllBranchOrders,
    getAllBrnachOrdersPaginated,
    countAllBranchOrders,
    createOrdersBranch
}