const productBranchModel = require('../models/productBranch.model');
const productModel = require("../models/product.model");
const sellerModel = require("../models/seller.model");

const addUpdateBranchesQty = async (product_id, branchesQty) => {
    await productBranchModel.deleteMany({ product_id: product_id });
    const newData = branchesQty.map(branch => ({
        product_id,
        ...branch
    }))
    var result = await productBranchModel.insertMany(newData);
    return result

}

const getAllProductsByBranchId = async (branch_id, page, limit, search, status) => {
    var skip = (page - 1) * limit;
    const allowedStatus = ['active', 'inactive'];
    const productStatus = allowedStatus.includes(status) ? status : { $in: allowedStatus };

    const branchProducts = await productBranchModel.find({ "branch.branch_id": branch_id }).exec();
    if (branchProducts.length === 0) return [];


    const productIds = branchProducts.map(item => item.product_id);
    const productQuery = { product_id: { $in: productIds }, status: productStatus };
    const products = await productModel.find(productQuery).sort({ createdAt: -1 }).exec();

    const filteredProducts = search
        ? products.filter(p => p.name.toLowerCase().includes(search.toLowerCase()))
        : products;

    const sellerIds = [...new Set(filteredProducts.map(p => p.seller_id))];
    const sellers = await sellerModel.find({ seller_id: { $in: sellerIds } }).exec();
    const sellerMap = sellers.reduce((map, seller) => {
        map[seller.seller_id] = seller.name;
        return map;
    }, {});

   
    const mergedProducts = filteredProducts.map(product => {
        const branchProduct = branchProducts.find(b => b.product_id == product.product_id);
        return {
            ...product.toObject(),
            branch_qty: branchProduct.qty,
            seller_name: sellerMap[product.seller_id] || "UnKnown",
            branch_status: branchProduct.status
        };
    });


    return mergedProducts.slice(skip, skip + limit);
};


const countProductsByBranch = async (branch_id, search, status) => {

    const allowedStatus = ['active', 'inactive'];
    const productStatus = allowedStatus.includes(status) ? status : { $in: allowedStatus };

    const branchProducts = await productBranchModel.find({ "branch.branch_id": branch_id });

    if (branchProducts.length === 0) return 0;

    const productIds = branchProducts.map(bp => bp.product_id);
    const productQuery = { product_id: { $in: productIds }, status: productStatus };
    if (search) {
        productQuery.name = { $regex: `.*${search}.*`, $options: "i" }; 
    }

    return await productModel.countDocuments(productQuery);
}

const createProductsBranch = async (data) => {
    return productBranchModel.create(data);
}

const getBranchesBtProductIds = async (productIds) => {
    var result = await productBranchModel.find({ product_id: { $in: productIds } });
    return result;

}
const UpdateReuqestQty = async (productId, Updatedqty,branchId) => {
  return  await productBranchModel.findOneAndUpdate({ product_id: productId ,
        'branch.branch_id':branchId
    },
        { $set: { qty: Updatedqty } },
        { new: true })
    
}
const getProductBranchbyId = async (productId, branchId) => {
    return productBranchModel.findOne({ 
        product_id: productId, 
        'branch.branch_id': branchId 
    });
};


const decreaseBranchStock = async (products,branch) => {
    var branch_Id=branch.branch_id;
    for (const key in products) {
        await productBranchModel.findOneAndUpdate(
            { product_id: key ,"branch.branch_id":branch_Id},
            { $inc: { qty: -products[key] } },
            { new: true }
        );
    }
};


const decreaseProductByBranchId = async (product_Id, branch_Id, qty) => {
    var data = await productBranchModel.findOneAndUpdate({
        product_id: product_Id, "branch.branch_id": branch_Id
    }, {
        $inc: { qty: -qty }
    }, {
        new: true
    }
    );
    return data;

}

const getProductBranchQty=async(branch_Id,productId)=>{
    var data= await productBranchModel.findOne({"branch.branch_id":branch_Id,product_id:productId},{qty:1});
    var qty= data?data.qty:0;
    return qty;
}
const isProductAssignedToBranch=async(product_id)=>{
    var data= await productBranchModel.find({product_id:product_id});
    var result=false;
    if(data){
        result=data.length>0?true:false;
    }
    return result;
}


module.exports = {
    addUpdateBranchesQty,
    getAllProductsByBranchId,
    countProductsByBranch,
    createProductsBranch,
    getBranchesBtProductIds,
    decreaseBranchStock,
    UpdateReuqestQty,
    getProductBranchbyId,
    decreaseProductByBranchId,
    getProductBranchQty,
    isProductAssignedToBranch

}