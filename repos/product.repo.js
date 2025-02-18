const productModel = require("../models/product.model");
const product = require("../models/product.model");
const sellerUpdateProductRequest = require("../models/sellerUpdateProductRequest.model");

const createProduct = async (productData) => {
    var result= await product.create(productData);
    return result;
}
const updateProduct = async (productid, productData) => {
    return product.findOneAndUpdate({ product_id: productid }, productData, { new: true })
}
const updateReturnedProduct = async (productid, updatedQty) => {
    return product.findOneAndUpdate(
        { product_id: productid }, 
        { $set: { qty: updatedQty } },  
        { new: true } 
    );
};

const updateProductRequest = async (productid, updatedData) => {

    return sellerUpdateProductRequest.findOneAndUpdate({ product_id: productid }, updatedData, { new: true });


};

//* Return all Products
const getProducts = async () => {

    return product.find({ status: "active" });
}

//* Return a product or list of products 
const selectedProducts = async (data) => {

    return await product.find({ product_id: { $in: data }, status: 'active' });
}

const getProductsBySeller = async (sellerId) => {
    return await product.find({ seller_id: sellerId, status: 'active' });
}
const getProductsBySellerPaginated = async (sellerId, page = 1, limit = 8, sort, category, status, search) => {
    var skip = (page - 1) * limit;
    const query = { seller_id: sellerId };
    let sortQuery = { createdAt: -1 };

    if (search) {
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
                createdAt: 1
            }
        }
    ];

    if (Object.keys(sortQuery).length > 0) {
        pipeline.splice(1, 0, { $sort: sortQuery });
    }

    return await product.aggregate(pipeline);
};

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



const getActivatedProductsPaginated = async (page, limit, sort, category) => {
    var skip = (page - 1) * limit;
        const query = { status: 'active' ,show:{$in:['online','all']}};
    let sortQuery = {createdAt:-1};
    if (category) {
        query.categories = { $elemMatch: { category_id: category } };
    }
    if (sort) {
        const sortOrder = sort === 'desc' ? -1 : 1;
        sortQuery = { price: sortOrder }
    }

    return await product.find(query)
        .sort(sortQuery)
        .skip(skip)
        .limit(limit)
        .exec();
}

const countActivatedProducts = async (category) => {
    const query = { status: 'active' ,show:{ $in:['online','all']}};
    if (category) {
        query.categories = { $elemMatch: { category_id: category } }
    }
    return await product.countDocuments(query);
}

const getproductsbyStatus = async (status) => {
    return product.find({ status: status });
}
const softdeleteproduct = async (productid) => {
    return product.findOneAndUpdate({ product_id: productid }, { status: "inactive" }, { new: true });
}
const ChangeStatusproduct=async(productid,status)=>{
    return  product.findOneAndUpdate({product_id:productid},{status:status},{new:true});
}
const getProductbyid = async (productid) => {
    return product.findOne({ product_id: productid });
}
const deleteproductbysellerid = async (sellerid) => {
    return product.findOneAndUpdate({ seller_id: sellerid }, { status: "inactive" }, { new: true });
}

const getAllProductsPaginated = async (page = 1, limit = 8, sort, category, status,search) => {
    var skip = (page - 1) * limit;
    const query = {};
    let sortQuery = { createdAt: -1 }; 

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
        {
            $lookup:{
                from:"branchproducts",
                localField:"product_id",
                foreignField:"product_id",
                as:"branches"
            }
             
        },
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
                } ,
                branches:{
                    $map:{
                        input:"$branches",
                        as:"b",
                        in: {
                            branch_id: "$$b.branch.branch_id",
                            qty: "$$b.qty"
                        }
                    }
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
    if (status) {
        query.status = status;
    }
    return await product.countDocuments(query);
}
const countSellerProducts = async (sellerId) => {
    return await product.countDocuments({ seller_id: sellerId });
}

//* Decrease Stock of products when order is created
const decreaseStock = async (products) => {


    for (const key in products) {
        await product.findOneAndUpdate(
            { product_id: key },
            { $inc: { qty: -products[key] } },
            { new: true }
        );
    }
};


const addReview = async (productId, customer, review) => {
    var product = await productModel.findOne({ product_id: productId });
    var result;
    if (product) {
        review.customer = customer;
        var productReviewCustomerIds = product.reviews.map(item => item.customer.customer_id);
        if (productReviewCustomerIds.includes(customer.customer_id)) {
            result = -1;
        } else {
            product.reviews.push(review);
            result = await product.save();
        }
    }
    return result;
}


module.exports = {
    getAllProductsPaginated
    , countAllProducts
    , createProduct
    , updateProductRequest
    , getProducts
    , selectedProducts, getproductsbyStatus,
    softdeleteproduct
    ,ChangeStatusproduct
    ,getProductbyid
    ,deleteproductbysellerid
    ,getActivatedProductsPaginated
    ,countActivatedProducts,
    getProductsBySeller,
    addProduct,
    updateProduct,
    deleteProduct,
    decreaseStock,
    addReview,
    getProductsBySellerPaginated,
    countSellerProducts,
    updateReturnedProduct
}
