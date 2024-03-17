import {cart,removeformcart} from '../data/cart.js';
import { products } from '../data/products.js';
import { formatcurrency } from './utils/money.js';
import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';
import {deliveryoption} from '../data/deliveryoptions.js'

let cartsummeryHTML='';

cart.forEach((cartitem)=>{
    const productId=cartitem.productId;

    let matchingproduct;

    products.forEach((product)=>{
        if(product.id===productId){
            matchingproduct=product;
        }
    });

    const deliveryoptionid=cartitem.deliveryoptionId;

    let deliveryoptions;

    deliveryoption.forEach((option)=>{
      if(option.id===deliveryoptionid){
        deliveryoptions=option;
      }
    });

    const today=dayjs();
    const deliverydate=today.add(deliveryoptions.deliverydays,'days');
    const datestring=deliverydate.format('dddd, MMMM D');

    cartsummeryHTML+=`
    <div class="cart-item-container js-cart-item-container-${matchingproduct.id}">
            <div class="delivery-date">
              Delivery date: ${datestring}
            </div>

            <div class="cart-item-details-grid">
              <img class="product-image"
                src="${matchingproduct.image}">

              <div class="cart-item-details">
                <div class="product-name">
                  ${matchingproduct.name}
                </div>
                <div class="product-price">
                  $${formatcurrency(matchingproduct.priceCents)}
                </div>
                <div class="product-quantity">
                  <span>
                    Quantity: <span class="quantity-label">${cartitem.quantity}</span>
                  </span>
                  <span class="update-quantity-link link-primary">
                    Update
                  </span>
                  <span class="delete-quantity-link link-primary js-delete-link" data-product-id="${matchingproduct.id}">
                    Delete
                  </span>
                </div>
              </div>

              <div class="delivery-options">
                <div class="delivery-options-title">
                  Choose a delivery option:
                </div>
                ${deliveryoptionHTML(matchingproduct,cartitem)}
              </div>
            </div>
          </div>
    `
});

function deliveryoptionHTML(matchingproduct,cartitem){
  let HTML='';
  deliveryoption.forEach((deliveryoption)=>{
    const today=dayjs();
    const deliverydate=today.add(deliveryoption.deliverydays,'days');
    const datestring=deliverydate.format('dddd, MMMM D');
    const pricestring=deliveryoption.pricecents===0?'FREE':`$${formatcurrency(deliveryoption.pricecents)} -`;
    const ischecked=deliveryoption.id===cartitem.deliveryoptionId;
    
    HTML+=`
    <div class="delivery-option">
                  <input type="radio"
                    ${ischecked?'checked':''}
                    class="delivery-option-input"
                    name="delivery-option-${matchingproduct.id}">
                  <div>
                    <div class="delivery-option-date">
                      ${datestring}
                    </div>
                    <div class="delivery-option-price">
                      ${pricestring} Shipping
                    </div>
                  </div>
      </div>
    `
  })

  return HTML;
}

document.querySelector('.js-order-summary').innerHTML=cartsummeryHTML;

document.querySelectorAll('.js-delete-link').forEach((link)=>{
    link.addEventListener('click', ()=>{
        const productId=link.dataset.productId;
        removeformcart(productId);

        const container=document.querySelector(`.js-cart-item-container-${productId}`);

        container.remove();
    });

});
