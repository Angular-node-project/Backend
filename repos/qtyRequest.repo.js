const clerkUpdateProductQtyRequestModel=require("../models/clerkUpdateProductQtyRequest.model");

const addQtyRequest=async(newRequest)=>{
    var result= await clerkUpdateProductQtyRequestModel.insertMany(newRequest);
    return result;
}
const getAllrequests=async()=>{
    return clerkUpdateProductQtyRequestModel.find({});
}
const getAllQtyRequestedPaginated = async (page, limit, sort, status,search) => {
    var skip = (page - 1) * limit;
    const query = {};
    let sortQuery = {};
    
    if (status) {
        query.status = status;
    }
    if(search){
    
        query.$or = [
            { product_name: { $regex: search, $options: 'i' }  },
            { 'branch.name':{ $regex: search, $options: 'i' }  },
            { 'requesterClerk.name':{ $regex: search, $options: 'i' }  }
        ];
    }
    if (sort) {
        const sortOrder = sort === 'desc' ? -1 : 1;
        sortQuery = { price: sortOrder }
    }
    return await clerkUpdateProductQtyRequestModel.find(query)
        .sort(sortQuery)
        .skip(skip)
        .limit(limit)
        .exec();
}
const countAllRequests=async(status)=>{
    const query={};
  
    if(status)
        {
            query.status=status ;
        }
    return await clerkUpdateProductQtyRequestModel.countDocuments(query);
}

module.exports={
    addQtyRequest,
    getAllQtyRequestedPaginated,
    countAllRequests,
    getAllrequests
}