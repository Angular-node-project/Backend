const customerservice=require("../models/support.model");
const getAllMessages=async()=>{
    return customerservice.find({});
}
const getMessagebyCustomerEmail=async(email)=>{
    return customerservice.find({email:email});
}
const getAllMessagesPaginated=async(page,limit,status,search)=>{
    var skip =(page-1)*limit;
    const query={};

    if(search){
        query.$or = [
            { name: { $regex: search, $options: 'i' }  },
            { email:{ $regex: search, $options: 'i' }  }
        ];
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
const countAllmessages=async(status)=>{
    const query={};
    if(status)
        {
            query.status=status ;
        }
    return await customerservice.countDocuments(query);
}
const SendMessage=async(email)=>{
    return customerservice.findOneAndUpdate({email:email},{status:"resolved"},{new:true});
}
module.exports={
    getAllMessagesPaginated,
    countAllmessages,
    getAllMessages,
    getMessagebyCustomerEmail,
    SendMessage
}