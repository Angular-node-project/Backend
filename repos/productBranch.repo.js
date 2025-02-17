const productBranchModel = require('../models/productBranch.model');
const productModel =require("../models/product.model");
const sellerModel=require("../models/seller.model");

const addUpdateBranchesQty = async (product_id, branchesQty) => {
    await productBranchModel.deleteMany({ product_id: product_id });
    const newData = branchesQty.map(branch => ({
        product_id,
        ...branch
    }))
    var result = await productBranchModel.insertMany(newData);
    return result

}

const getAllProductsByBranchId = async (branch_id, page, limit, search,status) => {
    var skip = (page - 1) * limit;
    const allowedStatus=['active','inactive'];
    const productStatus=allowedStatus.includes(status)?status:{$in:allowedStatus};
    const branchProducts= await productBranchModel.find({"branch.branch_id":branch_id})
            .skip(skip)
            .limit(limit)
            .exec();
      
    if(branchProducts.length==0) return [];
    const productIds=branchProducts.map(item=>item.product_id);
    const  productQuery={product_id:{$in:productIds},status:productStatus};
    if(search){
        productQuery.name={$regex:search,$options:'i'};
    }       
    const products= await productModel.find(productQuery).sort({createdAt:-1}).exec();
    const sellerIds=[...new Set(products.map(p=>p.seller_id))];
    const sellers=await sellerModel.find({seller_id:{$in:sellerIds}}).exec();
    const sellerMap= sellers.reduce((map,seller)=>{
        map[seller.seller_id]=seller.name;
        return map;
    },{})


    const mergedProducts= products.map(product=>{
        const branchProduct=branchProducts.find(b=>b.product_id==product.product_id);
        return {
            ...product.toObject(),
            branch_qty:branchProduct.qty,
            seller_name:sellerMap[product.seller_id]||"UnKnown",
            branch_status:branchProduct.status
        }
    })

    return mergedProducts;

}

const countProductsByBranch=async (branch_id, search,status)=> {
 
    const allowedStatus=['active','inactive'];
    const productStatus=allowedStatus.includes(status)?status:{$in:allowedStatus};

    const branchProducts = await productBranchModel.find({ "branch.branch_id": branch_id });

    if (branchProducts.length === 0) return 0;

    const productIds = branchProducts.map(bp => bp.product_id);
    const productQuery = { product_id: { $in: productIds }, status: productStatus };
    if (search) {
        productQuery.name = { $regex: search, $options: 'i' };
    }

    return await productModel.countDocuments(productQuery);
}

const getBranchesBtProductIds=async(productIds)=>{
  var result= await productBranchModel.find({product_id:{$in:productIds}});
  return result;

}


module.exports = { 
    addUpdateBranchesQty,
    getAllProductsByBranchId,
    countProductsByBranch,
    getBranchesBtProductIds

 }