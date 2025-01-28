const categoryrepo=require("../repos/category.repo");
const createCategory=async(categorydata)=>{
    return await categoryrepo.createCategory(categorydata);
}
const getCategories=async()=>{
    return await categoryrepo.getCategories();
}
const getCategorybyid=async(categoryid)=>{
    return await categoryrepo.getCategorybyid(categoryid);
}
const softDeletecategory=async(categoryid)=>{
    return  await categoryrepo.softDeletecategory(categoryid);
}
const restorecategory=async(categoryid)=>{
    return await categoryrepo.restorecategory(categoryid);
}
module.exports={
    createCategory,
    getCategories,
    getCategorybyid,
    softDeletecategory,
    restorecategory
}