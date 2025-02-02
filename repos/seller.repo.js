const seller =require("../models/seller.model")
const getSellers=async()=>{
    return seller.find({});
}
const getSellerbyid=async(sellerid)=>{
    return seller.findOne({seller_id:sellerid})
}
const getSellersByStatus=async(status)=>{
    return seller.find({status:status})
}
const softDeleteSeller=async(sellerid)=>{
    return seller.findOneAndUpdate({seller_id:sellerid},{status:"inactive"},{new:true})
}
const restoreSeller=async(sellerid)=>{
    return seller.findOneAndUpdate({seller_id:sellerid},{status:"active"},{new:true})
}
const getAllSellersPaginated=async(page,limit,sort,status)=>{
    var skip =(page-1)*limit;
    const query={};
    let sortQuery={};
    if(status)
    {
        query.status=status ;
    }
    if(sort){
        const sortOrder=sort==='desc'?-1:1;
        sortQuery={name:sortOrder}
    }

    return await  seller.find(query)
                         .sort(sortQuery)
                         .skip(skip)
                         .limit(limit)
                         .exec();  
}
const countAllsellers=async(status)=>{
    const query={};
    if(status)
        {
            query.status=status ;
        }
    return await seller.countDocuments(query);
}
module.exports=
{
    getAllSellersPaginated,
    countAllsellers,
    getSellers,
    getSellersByStatus,
    softDeleteSeller,
    restoreSeller,
    getSellerbyid
}