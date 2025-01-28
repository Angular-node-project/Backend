const category=require("../models/category.model");
const createCategory=async(categorydata)=>{
        return category.create(categorydata);
}
const getCategories=async()=>{
    return category.find({});
}
const getCategorybyid=async(categoryid)=>{
    return category.find({category_id:categoryid});
}
const softDeletecategory=async(categoryid)=>{
    return category.findOneAndUpdate({category_id:categoryid},{status:"inactive"},{new:true});
}
const restorecategory=async(categoryid)=>{
    return category.findOneAndUpdate({category_id:categoryid},{status:"active"},{new:true});
}
module.exports={
    createCategory,
    getCategories,
    getCategorybyid,
    softDeletecategory,
    restorecategory
}