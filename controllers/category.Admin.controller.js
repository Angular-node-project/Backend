const categoryservice=require('../services/category.service');
const {createcategoryDto}=require('../validators/category.validator');
const { unifiedResponse, handleError } = require('../utils/responseHandler');
module.exports=(()=>{
const router=require("express").Router();
router.post("/",async(req,res,next)=>{
    try{
        const { error, value } = createcategoryDto.validate(req.body,{abortEarly:false});
        if (error) {
            const errors= error.details.map(e=>e.message);
            return res.status(400).json(unifiedResponse(400, 'Validation Error', errors));
        }
            const category=await categoryservice.createCategory(value);
           return res.status(201).json(unifiedResponse(201, 'category created successfully', category));
    }catch (err) {
        handleError(res, err);
    }
})
router.get("/",async(req,res,next)=>{
    try{
       
            const categories= await categoryservice.getActiveCategoriesService();
           return res.status(201).json(unifiedResponse(201, 'categpries retrived successfully', categories));
    }catch (err) {
        handleError(res, err);
    }
})
router.get("/byid/:id",async(req,res,next)=>{
    try{
            const categoryid=req.params.id;
            const category=await categoryservice.getCategorybyid(categoryid);
            if(category){
               return res.status(201).json(unifiedResponse(201, 'Category retrived successfully', category));
            }else
            {
                return res.status(403).json(unifiedResponse(403, 'Category not found ', category));
            }
    }catch (err) {
        handleError(res, err);
    }
})
router.patch("/delete/:id",async(req,res,next)=>{
    try{
            const categoryid=req.params.id;
            const category=await categoryservice.softDeletecategory(categoryid);
            if(category){
               return res.status(201).json(unifiedResponse(201, 'Category deactive successfully', category));
            }else
            {
                return res.status(403).json(unifiedResponse(403, 'Category not found ', category));
            }
    }catch (err) {
        handleError(res, err);
    }
})
router.patch("/restore/:id",async(req,res,next)=>{
    try{
            const categoryid=req.params.id;
            const category=await categoryservice.restorecategory(categoryid);
            if(category){
               return res.status(201).json(unifiedResponse(201, 'Category restored successfully', category));
            }else
            {
                return res.status(403).json(unifiedResponse(403, 'Category not found ', category));
            }
    }catch (err) {
        handleError(res, err);
    }
})
return router;
})()