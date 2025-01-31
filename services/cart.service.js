const cartrepo = require("../repos/cart.repo");
const productrepo = require("../repos/product.repo");
const getCart = async (id) => {
    const cart = await cartrepo.getCart(id);

    //* Check if cart is empty 
    if(!cart){
        return {Error:"Cart is Empty"}
    }

    const produtsIds = [];
    const ErrorMsg = [];
    cart.product.forEach((i) => {
        produtsIds.push(i.product_id);
    });
    console.log(produtsIds);

    const selectedProducts = await productrepo.selectedProducts(produtsIds);
    console.log(selectedProducts);

    cart.product = cart.product
        .map((cartItem) => {
            const product = selectedProducts.find(
                (p) => p.product_id === cartItem.product_id
            );

            if (!product) {
                console.log(
                    `Product with ID ${cartItem.product_id} not found in the database.`
                );
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

    console.log("----------------------");
    console.log(cart);
    return {cart,ErrorMsg};
};

const updateProductQuantityInCart = async (customer_id, product_id, newQuantity) => {

    try {
        console.log("Holaaaaaaaaaaaaa")
        //* Chech that the Quantity is bigger than 0
        if(newQuantity<=0){
            console.log("Quantity Check Failed");
            throw new Error("quantity must be a positive number bigger than 0")
        }
        console.log("Quantity Check Passed");
        
        //* Check if the cart exist 
        const cart = (await getCart(customer_id)).cart;
        if(!cart){
            throw new  Error("Cart can't be Found !!!")
        }

        //* Check that if Product Found & the stock is bigger than or equal the new Quantity Required
        //* When Using Product you must first access [0] because selectedProducts return [] of products 
        const product= await productrepo.selectedProducts(product_id)
        if(!product){
            throw new  Error("Product can't be Found !!!")
        }
        console.log("--------------------------------")
        console.log(newQuantity)
        console.log(product[0].qty)
        console.log("--------------------------------")
        if(product[0].qty<newQuantity){
            throw new  Error(`Sorry but Product ${product[0].name} has only ${product[0].qty} Available in Our Stock `)
        }

        const updatedCart=await cartrepo.updateProductQuantityInCart(cart,product_id,newQuantity);

        return updatedCart;


    } catch (error) {
        return error.message
    }
    


}


module.exports = { getCart, updateProductQuantityInCart };
