const cartModel = require("../models/cart.model");
const cartrepo = require("../repos/cart.repo");
const productrepo = require("../repos/product.repo");
const getCart = async (id) => {
    const cart = await cartrepo.getCart(id);

    //* Check if cart is empty 
    if(!cart){
        return  { cart: null, ErrorMsg: "Cart Wasn't Found" }
    }
    console.log(cart);

    const produtsIds = [];
    const ErrorMsg = [];
    cart.product.forEach((i) => {
        produtsIds.push(i.product_id);
    });
    // console.log(produtsIds);

    const selectedProducts = await productrepo.selectedProducts(produtsIds);
    // console.log(selectedProducts);

    cart.product = cart.product
        .map((cartItem) => {
            const product = selectedProducts.find(
                (p) => p.product_id === cartItem.product_id
            );

            if (!product) {
                // console.log(
                //     `Product with ID ${cartItem.product_id} not found in the database.`
                // );
                ErrorMsg.push(`Sorry but ${cartItem.name} has been Removed`)
                return null; // Mark for removal
            } else if (product.qty === 0) {
                ErrorMsg.push(`Sorry but ${cartItem.name} Out of stock`)
                return null; // Mark for removal
            } else if (product.qty < cartItem.qty) {
                ErrorMsg.push(`Sorry but ${cartItem.name} has only ${cartItem.qty} `);
                cartItem.qty = product.qty; // Update quantity to available stock
            }

            return cartItem; // Keep the product in the cart
        })
        .filter((cartItem) => cartItem !== null); // Remove null values (products marked for removal)

        if(ErrorMsg.length>0){
            cartrepo.updateCart(cart)
        }

    // console.log("----------------------");
    // console.log(cart);
    return {cart,ErrorMsg};
};

const updateProductQuantityInCart = async (customer_id, product_id, newQuantity) => {

    try {
        // console.log("Holaaaaaaaaaaaaa")
        //* Chech that the Quantity is bigger than 0
        if(newQuantity<=0){
            // console.log("Quantity Check Failed");
            throw new Error("quantity must be a positive number bigger than 0")
        }
        // console.log("Quantity Check Passed");
        
        //* Check if the cart exist 
        const cart = (await getCart(customer_id)).cart;
        if(!cart){
            throw new  Error("Cart can't be Found !!!")
        }

        // console.log("************************************")
        // console.log("************************************")
        // console.log(cart)
        // console.log("************************************")
        // console.log("************************************")
        // console.log("************************************")

        //* Check that if Product Found & the stock is bigger than or equal the new Quantity Required
        //* When Using Product you must first access [0] because selectedProducts return [] of products 
        const product= await productrepo.selectedProducts(product_id)
        if(!product){
            throw new  Error("Product can't be Found !!!")
        }
        // console.log("--------------------------------")
        // console.log(newQuantity)
        // console.log(product[0].qty)
        // console.log("--------------------------------")
        if(product[0].qty<newQuantity){
            throw new  Error(`Sorry but Product ${product[0].name} has only ${product[0].qty} Available in Our Stock `)
        }

        const updatedCart=await cartrepo.updateProductQuantityInCart(cart,product_id,newQuantity);

        return updatedCart;


    } catch (error) {
        return {ErrorMsg:error.message,success: false}
    }
    


};

const addCart=async(customerId,product_id,qty)=>{
    try {
        console.log("Hola")
        //* First check if there is a cart
        let cart=await cartrepo.getCart(customerId);
        console.log("Hola2")
        
        if(!cart){
        console.log("Hola3")
        cart=new cartModel();
        cart.customer_id=customerId;
        // console.log("Hola From Here------------------------------------")
        // console.log(cart)
        console.log("Enter1")
        await cartrepo.createCart(cart);
        console.log("Enter2")
        await addNewProductToCart(cart,product_id,qty,customerId)
    }else{
        const existProduct=cart.product.find(u=>{
            if(u.product_id==product_id)
                return u
        })
        if(existProduct){

            // console.log("Found")
            // console.log(existProduct)
            const product=await productrepo.getProductbyid(product_id);
            let newQuantity=(existProduct.qty+qty)
            if(product.qty<newQuantity){
                throw new  Error(`Sorry but Product ${product.name} has only ${product.qty} Available in Our Stock `)
            }
            const updatedCart=await cartrepo.updateProductQuantityInCart(cart,product_id,newQuantity);
            return updatedCart;
            //* Update Qty
        }else{
            // console.log("Not Found")
            await addNewProductToCart(cart,product_id,qty,customerId)
        }
    }
    return {
        success: true,
        message: "Cart Updated successfully",
        data: cart
    }; 
    } catch (error) {
        return {ErrorMsg:error.message,success: false}
    }
 
};

const addNewProductToCart= async(cart,product_id,qty,customer_id)=>{

    try {
        console.log("Enter");
        // console.log("Hola From Add new Product To Cart ")
        // console.log("****************************************")
        // console.log(cart)
        // console.log("****************************************")
    //* Check if product Exist
    const product =await productrepo.getProductbyid(product_id);
    if(!product){
        throw new Error("Product Wasn't Found!!!")
    }
    if(qty>product.qty){
        throw new  Error(`Sorry but Product ${product.name} has only ${product.qty} Available in Our Stock `)
    }
    cart.customer_id=customer_id;
    
    // console.log("****************************************")
    console.log(cart)
    // console.log("****************************************")
    cart.product.push({
        product_id: product.product_id,     
        seller_id: product.seller_id, 
        name: product.name,          
        qty:qty,
        price:product.price,
        pic_path:product.pics
    });
    // console.log(product)
    // console.log(cart)


    return await cartrepo.updateCart(cart);

    } catch (error) {
        return {ErrorMsg:error.message,success: false}
    }

}

const deleteProductFromCart=async(productId,customerId)=>{
    try {
        let cart= await cartrepo.deleteProductFromCart(productId,customerId)
        return { success: true, cart}
    } catch (error) {
      return {ErrorMsg:error.message,success: false}
    }
}


const addFirstListProducts=async(customer_id,newProducts)=>{
   var res= await cartrepo.addProductsList(newProducts,customer_id);
   return res;
}


module.exports = { getCart
    , updateProductQuantityInCart
    ,addCart 
    ,addFirstListProducts
    ,deleteProductFromCart
};
