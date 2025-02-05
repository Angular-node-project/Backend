const Cart=require("../models/cart.model")

const getCart=async(id)=>{

    return Cart.findOne({customer_id:id},{});
}

// ! Testing only 
const getAllCart=async(id)=>{

    return Cart.findOne({},{});
}

const updateCart=async(data)=>{

//   console.log("Hola From Update ")
//   console.log(data)
      const result = await Cart.findOneAndUpdate(
        { cart_id: data.cart_id }, 
        { $set: {
            product:data.product
        } },  
        { new: true }   
    );
    // console.log(result)
    return {
        success: true,
        message: "Cart updated successfully",
        result: result
    };
}

const updateProductQuantityInCart = async (cart, product_id, newQuantity) => {
    try {
        // console.log("********************************************");
        // console.log("Updating product quantity in cart:", {  cart, product_id, newQuantity });
        // console.log("********************************************");
        // console.log("!!!!!!!!!!!!!!!!!!!!!!!!!!!!")
        // console.log(cart.product)
        // console.log("!!!!!!!!!!!!!!!!!!!!!!!!!!!!")
        // Find the product in the cart by product_id
        const productIndex = cart.product.findIndex(
            (p) => p.product_id === product_id
        );

        // Check if the product exists in the cart
        if (productIndex === -1) {
            throw new Error("Product not found in the cart.");
        }

        // Update the product's quantity
        cart.product[productIndex].qty = newQuantity;

        // console.log("Before Saving")
        // Save the updated cart
        const updatedCart = await updateCart(cart)
        // console.log("After Saving")

        // console.log("Product quantity updated successfully:", updatedCart);
        return {
            success: true,
            message: "Product quantity updated successfully",
            newQty: newQuantity
        };

    } catch (error) {
        // console.error("Error updating product quantity in cart:", error.message);
        return {
            success: false,
            message: error.message
        };
    }
};

const deleteCart=async (customerId)=>{

    return Cart.deleteOne({customer_id:customerId},{})
};

//* Create Cart For Customer if No cart was Found 
//* Note that the cart will contain at least one product (First product to be added to the Cart)
const createCart=async(newCart)=>{
    // console.log("Hola From Create Cart ")
    return Cart.create(newCart)
}


module.exports={getCart,updateCart,getAllCart,updateProductQuantityInCart,deleteCart,createCart}