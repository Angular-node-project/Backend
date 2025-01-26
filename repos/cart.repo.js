const Cart=require("../models/cart.model")

const getCart=async(id)=>{

    return Cart.findOne({customer_id:id},{});
}

const updateCart=async(data)=>{


      // Remove the _id field from the data object to avoid updating it
    
    const result = await Cart.updateOne(
        { cart_id: data.cart_id }, // Filter by cart_id
        { $set: data },            // Update with the provided data
        { upsert: false }          // Do not create a new document if it doesn't exist
    );
    return result
}

module.exports={getCart,updateCart}