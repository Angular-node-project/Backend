const orderRepo=require("../repos/order.repo");
const cartRepo=require("../repos/cart.repo");
const sellerRepo=require("../repos/seller.repo");
const productRepo=require("../repos/product.repo");
const OrderBranchRepo=require("../repos/branchorder.repo");
const ProductBranchRepo=require("../repos/productBranch.repo");
const getorders=async()=>{
    return await orderRepo.getorders();
}
const getorderbystatus=async(status)=>{
    return await orderRepo.getorderbystatus(status);
}
const getorderbydid=async(orderid)=>{
    return await orderRepo.getorderbydid(orderid);
}
const ChangeOrderStatus=async(orderid,status)=>{
    return await orderRepo.ChangeOrderStatus(orderid,status);
}
const getorderbysellerid=async(sellerid)=>{
    return await orderRepo.getorderbysellerid(sellerid);
}
const getorderbyproductid=async(productid)=>{
    return await orderRepo.getorderbyproductid(productid);
}

const addOrder=async(orderData)=>{


    const produtsIds = [];
    const ErrorMsg = [];
    orderData.product.forEach((i) => {
        produtsIds.push(i.product_id);
    });

    const selectedProducts = await productRepo.selectedProducts(produtsIds);

    orderData.product = orderData.product
        .map((cartItem) => {
            const product = selectedProducts.find(
                (p) => p.product_id === cartItem.product_id
            );

            if (!product) {
                ErrorMsg.push(`Sorry but ${cartItem.name} has been Removed`)
                return null; // Mark for removal
            } else if (product.qty === 0) {
                ErrorMsg.push(`Sorry but ${cartItem.name} Out of stock`)
                return null; // Mark for removal
            } else if (product.qty < cartItem.qty) {
                ErrorMsg.push(`Sorry but ${cartItem.name} has only ${product.qty} `);
                cartItem.qty = product.qty; // Update quantity to available stock
            }
            return cartItem; // Keep the product in the cart
        })
        .filter((cartItem) => cartItem !== null); // Remove null values (products marked for removal)
        if(ErrorMsg.length>0){
            return {
                success: false,
                data: orderData,
                ErrorMsg:ErrorMsg.join(",")
            }; 
        }

    const customerId=orderData.customer_id

    await cartRepo.deleteCart(customerId);

    
    const prices={}
    const products={}

    orderData.product.forEach(element => {
        if(isNaN(prices[element.seller_id]))
            prices[element.seller_id]=0;
            prices[element.seller_id]+=(element.qty*element.price)
        products[element.product_id]=element.qty
    });

        await sellerRepo.increaseSellerWallet(prices);
        await productRepo.decreaseStock(products);

    let order= await orderRepo.createOrder(orderData);
    return {
        success: true,
        data: order
    }; 
}
const addCashierOrder=async(orderData,branch)=>{
    

    //*
    const produtsIds = [];
    const ErrorMsg = [];
    orderData.product.forEach((i) => {
        produtsIds.push(i.product_id);
    });

    const selectedProducts = await productRepo.selectedProducts(produtsIds);

    orderData.product = orderData.product
        .map((cartItem) => {
            const product = selectedProducts.find(
                (p) => p.product_id === cartItem.product_id
            );

            if (!product) {
                ErrorMsg.push(`Sorry but ${cartItem.name} has been Removed`)
                return null; // Mark for removal
            } else if (product.qty === 0) {
                ErrorMsg.push(`Sorry but ${cartItem.name} Out of stock`)
                return null; // Mark for removal
            } else if (product.qty < cartItem.qty) {
                ErrorMsg.push(`Sorry but ${cartItem.name} has only ${product.qty} `);
                cartItem.qty = product.qty; // Update quantity to available stock
            }
            return cartItem; // Keep the product in the cart
        })
        .filter((cartItem) => cartItem !== null); // Remove null values (products marked for removal)
        if(ErrorMsg.length>0){
            return {
                success: false,
                data: orderData,
                ErrorMsg:ErrorMsg.join(",")
            }; 
        }
    //*
    const prices={}
    const products={}

    orderData.product.forEach(element => {
        if(isNaN(prices[element.seller_id]))
            prices[element.seller_id]=0;
            prices[element.seller_id]+=(element.qty*element.price)
        products[element.product_id]=element.qty
    });

        await sellerRepo.increaseSellerWallet(prices);
        await productRepo.decreaseStock(products);
        await ProductBranchRepo.decreaseBranchStock(products,branch);


        //* Making Order Deliverd only for cashier Order
    orderData.status="delivered";
    

    let order= await orderRepo.createOrder(orderData);

    //* Add Orders in  Branch 
    order.product.forEach(p=>{
        let branchOrder={
            order_id:order.order_id,
            product:{product_id:p.product_id,name:p.name},
            branch:branch,
            qty:p.qty,
            status:"delivered"
        }
        OrderBranchRepo.createOrdersBranch(branchOrder)
    })

    return {
        success: true,
        data: order,
    }; 
}
const getAllordersPaginated = async (page = 1, limit = 6,status='',governorate='',type='') => {
    const orders = await orderRepo.getAllOrdersPaginated(page, limit,status,governorate,type);
    const totalOrderssCount = await orderRepo.countAllOrders(status);
    return {
        orders,
        currentPage: parseInt(page),
        totalPages: Math.ceil(totalOrderssCount / limit),
        totalOrderssCount
    }
}

const getCustomerOrders=async(customerId)=>{
    let orders= await orderRepo.getCustomerOrders(customerId);
    
    return orders
}

const getOrdersBySellerIdPaginated = async (sellerId, page = 1, limit = 8,governorate='') => {
    const orders = await orderRepo.getOrdersBySellerIdPaginated(sellerId, page, limit,governorate);
    const totalOrdersCount = await orderRepo.countOrdersBySellerId(sellerId);
    return {
        orders,
        currentPage: parseInt(page),
        totalPages: Math.ceil(totalOrdersCount / limit),
        totalOrdersCount
    }
}
const CheckProductAvailability=async(product)=>{
    
    
    return orders
}

const assignOrderToBranchesService=async(orderBranches)=>{
    return orderRepo.assignOrderToBranches(orderBranches);
}

const cancelAllOrderBranchesService=async(order_id)=>{
    return await orderRepo.cancelAllOrderBranches(order_id);
}


module.exports={
    getAllordersPaginated,
    getorders,
    getorderbystatus,
    getorderbydid,
    ChangeOrderStatus,
    getorderbysellerid,
    getorderbyproductid,
    addOrder,
    getCustomerOrders,
    addCashierOrder,
    getOrdersBySellerIdPaginated,
    CheckProductAvailability,
    assignOrderToBranchesService,
    cancelAllOrderBranchesService
}


