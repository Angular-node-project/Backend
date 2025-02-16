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
       
                   var page = parseInt(req.query.page) || 1;
                    var limit = parseInt(req.query.limit) ;
                    var status = req.query.status;
                    var name = req.query.name;
                    if (page || status || name|| limit) {
                        const result = await categoryservice.getAllCategoriesPaginated(page, limit, status, name);
                        return res.status(201).json(unifiedResponse(201, 'Paginated Categories returned successfully', result));
                    } else {
                        const categories = await categoryservice.getCategories();
                        return res.status(201).json(unifiedResponse(201, 'All Categories returned successfully', categories));
                    }
    }catch (err) {
        handleError(res, err);
    }
})
router.patch("/:categoryid", async (req, res, next) => {
    try {
        const categoryid = req.params.categoryid;
        const { error, value } = createcategoryDto.validate(req.body, { abortEarly: false });
        if (error) {
            const errors = error.details.map(e => e.message);
            return res.status(400).json(unifiedResponse(400, 'Validation Error', errors));
        }

        const branch = await categoryservice.updateCategory(categoryid, value);
        return res.status(201).json(unifiedResponse(201, 'category updated successfully', branch));
    } catch (err) {
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
router.patch("/changestatus/:id/:status",async(req,res,next)=>{
    try{
            const categoryid=req.params.id;
            const status=req.params.status;
            const category=await categoryservice.changestatus(categoryid,status);
            if(category){
               return res.status(201).json(unifiedResponse(201, 'Category status changed successfully', category));
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