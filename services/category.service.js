const categoryrepo=require("../repos/category.repo");
const createCategory=async(categorydata)=>{
    return await categoryrepo.createCategory(categorydata);
}
const getCategories=async()=>{
    return await categoryrepo.getCategories();
}

const getAllCategoriesPaginated=async(page=1,limit=6,status='',name='')=>{
   
   const categories= await categoryrepo.getAllCategoriesPaginated(page,limit,status,name);
   const totalCategoriesCount = await categoryrepo.countAllCategories(status);
       return {
           categories,
           currentPage: parseInt(page),
           totalPages: Math.ceil(totalCategoriesCount / limit),
           totalCategoriesCount
       }
}

const getActiveCategoriesService=async()=>{
    return await categoryrepo.getActiveCategories();
}
const getCategorybyid=async(categoryid)=>{
    return await categoryrepo.getCategorybyid(categoryid);
}
const softDeletecategory=async(categoryid)=>{
    return  await categoryrepo.softDeletecategory(categoryid);
}
const changestatus=async(categoryid,status)=>{
    return await categoryrepo.changestatus(categoryid,status);
}
const updateCategory=async(categoryid,categorydata)=>{
    return await categoryrepo.updateCategory(categoryid,categorydata);
}
module.exports={
    createCategory,
    getCategories,
    getCategorybyid,
    softDeletecategory,
    changestatus,
    getActiveCategoriesService,
    getAllCategoriesPaginated,
    updateCategory
}