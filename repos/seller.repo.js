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
const changeStatus=async(sellerid,status)=>{
    return seller.findOneAndUpdate({seller_id:sellerid},{status:status},{new:true})
}
const getAllSellersPaginated=async(page,limit,sort,status,search)=>{
    var skip =(page-1)*limit;
    const query={};
    let sortQuery={};
    if(search)
    {
        query.name = { $regex: search, $options: 'i' };  
    }
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

//* Increase Wallet of Seller Used When Order Get created
const increaseSellerWallet=async(sellers)=>{

    for (const key in sellers) {
        res=await seller.findOneAndUpdate(
            { seller_id: key }, 
            { $inc: { wallet: +sellers[key] } }, 
            { new: true } 
        );
    }

};

module.exports=
{
    getAllSellersPaginated,
    countAllsellers,
    getSellers,
    getSellersByStatus,
    softDeleteSeller,
    changeStatus,
    getSellerbyid,
    increaseSellerWallet
}