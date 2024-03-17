export let cart=JSON.parse(localStorage.getItem('cart'));

if(!cart){
    cart=[{
        productId:'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
        quantity:2,
        deliveryoptionId:'1'
    },{
        productId:'15b6fc6f-327a-4ec4-896f-486349e85a3d',
        quantity:1,
        deliveryoptionId:'2'
    }];
}

function savetostorage(){
    localStorage.setItem('cart',JSON.stringify(cart));
}

export function addtocart(productId){
    let matchingItem;

        cart.forEach((cartitem)=>{
            if(productId===cartitem.productId){
                matchingItem=cartitem;
            }
        });

        if(matchingItem){
            matchingItem.quantity+=1;
        }else{
            cart.push({
                productId:productId,
                quantity:1,
                deliveryoptionId:'1'
            });
        }
    
    savetostorage();
}

export function removeformcart(productId){
    const newCart=[];

    cart.forEach((cartitem)=>{
        if(cartitem.productId!=productId){
            newCart.push(cartitem);
        }
    });

    cart=newCart;

    savetostorage();
}

export function updatedeliveryoption(productId,deliveryoptionId){
    let matchingItem;

    cart.forEach((cartitem)=>{
        if(productId===cartitem.productId){
            matchingItem=cartitem;
        }
    });

    matchingItem.deliveryoptionId=deliveryoptionId;
    savetostorage();

}