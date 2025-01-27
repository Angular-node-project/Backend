const cartrepo = require("../repos/cart.repo");
const productrepo = require("../repos/product.repo");
const getCart = async (id) => {
    const cart = await cartrepo.getCart(id);
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

        // if(ErrorMsg.length>0){
        //     cartrepo.updateCart(cart)
        // }

    console.log("----------------------");
    console.log(cart);
    return {cart,ErrorMsg};
};

module.exports = { getCart };
