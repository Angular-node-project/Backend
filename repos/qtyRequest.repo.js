const clerkUpdateProductQtyRequestModel=require("../models/clerkUpdateProductQtyRequest.model");

const addQtyRequest=async(newRequest)=>{

        var result= await clerkUpdateProductQtyRequestModel.create(newRequest);
        return result;
}
const getAllrequests=async()=>{
    return clerkUpdateProductQtyRequestModel.find({});
}
const getAllQtyRequestedPaginated = async (page, limit, sort, status,search) => {
    var skip = (page - 1) * limit;
    const query = {};
    let sortQuery = { createdAt: -1 };
    
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
        sortQuery = { product_name: sortOrder }
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
const UpdateQtyRequest=async(requestId,status)=>{
    return clerkUpdateProductQtyRequestModel.findOneAndUpdate({request_id:requestId},{status:status },{new:true})
}

module.exports={
    addQtyRequest,
    getAllQtyRequestedPaginated,
    countAllRequests,
    getAllrequests,
    UpdateQtyRequest
}