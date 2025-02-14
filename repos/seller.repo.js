const sellerModel = require("../models/seller.model");
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
    let sortQuery={createdAt:-1};
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


const createSeller=async(newSeller)=>{
    return await sellerModel.create(newSeller);
}

const isEmailExist=async(email)=>{
    var res= await sellerModel.findOne({email:email});
    return res?true:false;
}

const getSellerByEmail=async(email)=>{
    var res= await sellerModel.findOne({email:email});
    return res;
}
const updateSeller=async(seller)=>{
    var res=await sellerModel.findOneAndUpdate({seller_id:seller.seller_id},{$set:seller},{new:true,runValidators:true});
    return res;
}

module.exports=
{
    getAllSellersPaginated,
    countAllsellers,
    getSellers,
    getSellersByStatus,
    softDeleteSeller,
    changeStatus,
    getSellerbyid,
    increaseSellerWallet,
    createSeller,
    isEmailExist,
    getSellerByEmail,
    updateSeller
}