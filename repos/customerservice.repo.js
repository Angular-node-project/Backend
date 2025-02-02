const customerservice=require("../models/support.model");
const getAllMessages=async()=>{
    return customerservice.find({});
}
const getMessagebyCustomerEmail=async(email)=>{
    return customerservice.find({email:email});
}
const getAllMessagesPaginated=async(page,limit,status,email)=>{
    var skip =(page-1)*limit;
    const query={};

    if(email){
        query.email=email ;
    }
    if(status)
    {
        query.status=status ;
    }
    return await  customerservice.find(query)
                         .skip(skip)
                         .limit(limit)
                         .exec();  
}
const countAllmessages=async(status,email)=>{
    const query={};
    if(email){
        query.email=email ;
    }
    if(status)
        {
            query.status=status ;
        }
    return await customerservice.countDocuments(query);
}
module.exports={
    getAllMessagesPaginated,
    countAllmessages,
    getAllMessages,
    getMessagebyCustomerEmail
}