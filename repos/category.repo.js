const category=require("../models/category.model");
const createCategory=async(categorydata)=>{
        return category.create(categorydata);
}
const getCategories=async()=>{
    return category.find({});
}
const getAllCategoriesPaginated=async(page,limit,status,name)=>{
    var skip =(page-1)*limit;
    const query={};

    if(name){
        query.name={$regex: name, $options: 'i'} ;
    }
    if(status)
    {
        query.status=status ;
    }
    return await  category.find(query)
                         .skip(skip)
                         .limit(limit)
                         .exec();  
}
const countAllCategories=async(status)=>{
    const query={};
  
    if(status)
        {
            query.status=status ;
        }
    return await category.countDocuments(query);
}
const getActiveCategories=async()=>{
    return category.find({status:'active'},{name:1,category_id:1,_id:0});
}
const getCategorybyid=async(categoryid)=>{
    return category.find({category_id:categoryid});
}
const softDeletecategory=async(categoryid)=>{
    return category.findOneAndUpdate({category_id:categoryid},{status:"inactive"},{new:true});
}
const changestatus=async(categoryid,status)=>{
    return category.findOneAndUpdate({category_id:categoryid},{status:status},{new:true});
}
module.exports={
    createCategory,
    getCategories,
    getCategorybyid,
    softDeletecategory,
    changestatus,
    getActiveCategories,
    getAllCategoriesPaginated,
    countAllCategories
}