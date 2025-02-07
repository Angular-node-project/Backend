const product = require("../models/product.model");

const createProduct=async(productData)=>{
    return product.create(productData);
}
const updateProduct=async(productid,productData)=>{
    return product.findOneAndUpdate({product_id:productid},productData,{new:true})
}
const updateProductRequest = async (productid,updatedData) => {
   
     return  product.findOneAndUpdate({ product_id: productid }, updatedData,{ new: true }  );

};

//* Return all Products
const getProducts=async()=>{

    return product.find({status:"active"});
}

//* Return a product or list of products 
const selectedProducts=async(data)=>{

    return await product.find({ product_id: { $in: data } });
}

const getProductsBySeller = async (sellerId) => {
    return await product.find({ seller_id: sellerId, status: 'active' });
}

const addProduct = async (sellerId, productData) => {
    const newProduct = new product({ ...productData, seller_id: sellerId, status: 'pending' });
    return await newProduct.save();
}




const deleteProduct = async (sellerId, productId) => {
    return await product.findOneAndUpdate(
        { product_id: productId, seller_id: sellerId },
        { $set: { status: 'inactive' } },
        { new: true }
    );
}



const getActivatedProductsPaginated=async(page,limit,sort,category)=>{
    var skip =(page-1)*limit;
    const query={status:'active'};
    let sortQuery={};
    if(category){
        query.categories = { $elemMatch: { category_id: category }};
    }
    if(sort){
        const sortOrder=sort==='desc'?-1:1;
        sortQuery={price:sortOrder}
    }

    return await  product.find(query)
                         .sort(sortQuery)
                         .skip(skip)
                         .limit(limit)
                         .exec();  
}

const countActivatedProducts=async(category)=>{
    const query={status:'active'};
    if(category){
        query.categories={$elemMatch:{category_id:category}}
    }
    return await product.countDocuments(query);
}

const getproductsbyStatus=async(status)=>{
    return  product.find({status:status});
}
const softdeleteproduct=async(productid)=>{
    return  product.findOneAndUpdate({product_id:productid},{status:"inactive"},{new:true});
}
const ChangeStatusproduct=async(productid,status)=>{
    return  product.findOneAndUpdate({product_id:productid},{status:status},{new:true});
}
const getProductbyid=async(productid)=>{
    return  product.findOne({product_id:productid});
}
const deleteproductbysellerid=async(sellerid)=>{
    return  product.findOneAndUpdate({seller_id:sellerid},{status:"inactive"},{new:true});
}

const getAllProductsPaginated = async (page = 1, limit = 6, sort, category, status,search) => {
    var skip = (page - 1) * limit;
    const query = {};
    let sortQuery = {};

    if(search)
    {
        query.name = { $regex: search, $options: 'i' };  

    }
    if (category) {
        query.categories = { $elemMatch: { category_id: category } };
    }
    if (status) {
        query.status = status;
    }
    if (sort) {
        const sortOrder = sort === "desc" ? -1 : 1;
        sortQuery = { price: sortOrder };
    }

    const pipeline = [
        { $match: query },  
        {
            $lookup: {
                from: "sellers",   
                localField: "seller_id",
                foreignField: "seller_id",
                as: "seller"
            }
        },
        { $unwind: "$seller" }, 
        { $skip: skip },       
        { $limit: limit },     
        {
            $project: {
                product_id: 1,
                name: 1,
                description: 1,
                price: 1,
                status: 1,
                categories: 1,
                qty: 1,  
                pics: 1,
                reviews: 1,
                seller: {
                    seller_id: 1,
                    name: 1,
                } 
            }
        }
    ];

    if (Object.keys(sortQuery).length > 0) {
        pipeline.splice(3, 0, { $sort: sortQuery });  
    }

    return await product.aggregate(pipeline);
};


const countAllProducts=async(category,status)=>{
    const query={};
    if(category){
        query.categories={$elemMatch:{category_id:category}}
    }
    if(status)
        {
            query.status=status ;
        }
    return await product.countDocuments(query);
}


module.exports={
    getAllProductsPaginated
    ,countAllProducts
    ,createProduct
    ,updateProductRequest
    ,getProducts
    ,selectedProducts,getproductsbyStatus,
    softdeleteproduct
    ,ChangeStatusproduct
    ,getProductbyid
    ,deleteproductbysellerid
    ,getActivatedProductsPaginated
    ,countActivatedProducts,
    getProductsBySeller,
    addProduct,
    updateProduct,
    deleteProduct
}
