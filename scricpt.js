$( document ).ready(function() {
$(".slick-slider").slick({
slidesToShow: 1,
slidesToScroll: 1,
autoplay: false,
autoplaySpeed: 2000,
dots: false,
arrows: true,
responsive: [
    {
      breakpoint: 1000,   // Change settings for screens smaller than 768px
      settings: {
        autoplay: true,
        arrows: false,
      }
    }
  ]
});
});

// dark mode
document.addEventListener("DOMContentLoaded", () => {
  let toggleBtn = document.getElementById('dark'); 
  let darkMode = localStorage.getItem('dark-mode');
  let blackImage = document.querySelectorAll('.black-image');
  const body = document.body;
  const enableDarkMode = () => {
      toggleBtn.classList.replace('fa-sun', 'fa-moon');
      body.classList.add('dark');
      blackImage.forEach(image => image.classList.add('white-image')); // Add class to all black images
      localStorage.setItem('dark-mode', 'enabled');
  }
  const disableDarkMode = () => {
      toggleBtn.classList.replace('fa-moon', 'fa-sun');
      body.classList.remove('dark');
      blackImage.forEach(image => image.classList.remove('white-image')); // Add class to all black images
      localStorage.setItem('dark-mode', 'disabled');
  }
  if (darkMode === 'enabled') {
      enableDarkMode();
  }
  toggleBtn.onclick = (e) => {
      let darkMode = localStorage.getItem('dark-mode');
      if (darkMode === 'disabled') {
          enableDarkMode();
   // Add class to make image white
      } else {
          disableDarkMode();
      }
  }

// hamburger
const bar = document.getElementById('burger')
const nav = document.getElementById('navbar')
const close = document.getElementById('close')
const closeCart = document.getElementById('close-cart')
const bgCart = document.getElementById('bgcart')
const boxCart = document.getElementById('cart-box')
const bgCartMobile = document.getElementById('bgcartmob')

if(bar){
  bar.addEventListener('click',() =>{
  nav.classList.add('shownav');
  });
}
if(bgCart){
  bgCart.addEventListener('click',() =>{
    boxCart.classList.add('cartnav');
  });
}
if(close){
  close.addEventListener('click',() =>{
    nav.classList.remove('shownav')
  });
}
if(closeCart){
  closeCart.addEventListener('click',() =>{
    boxCart.classList.remove('cartnav')
  });
}
if (bgCartMobile) {
  bgCartMobile.addEventListener('click', () => {
    boxCart.classList.add('cartnav');
  });
}

// on click small image append in bigger image
let mainImage = document.getElementById("MainImg");
let smallImage = document.getElementsByClassName("SmallImg");
smallImage[0].onclick = function(){
  mainImage.src = smallImage[0].src;
  console.log(toggleBtn);
}
smallImage[1].onclick = function(){
  mainImage.src = smallImage[1].src;
}
smallImage[2].onclick = function(){
  mainImage.src = smallImage[2].src;
}
smallImage[3].onclick = function(){
  mainImage.src = smallImage[3].src;
}
});

// cart Process code
const productsE1 = document.querySelector(".product-container");
const cartItemEl = document.querySelector(".cart-items");
const subTotalEL = document.querySelector(".total");
const itemNoInCart = document.querySelector('.supp');
function renderProducts(){
  product.forEach((product) => {
    productsE1.innerHTML += `
    <div class="pro">
                    <img src="${product.imgSrc}" alt="t-shirt-images">
                    <div class="des">
                        <span>${product.brand}</span>
                        <h5>${product.name}</h5>
                        <div class="star">
                          ${product.star}
                        </div>
                        <h4>₹${product.price}</h4>
                    </div>
                    <a><i class="fa-solid fa-cart-shopping cart" onclick="addToCart(${product.id})"></i></a>
                </div>
    `;
});
}
renderProducts();

// add to cart function
let cart = JSON.parse(localStorage.getItem("CART")) || [];
updateCart();
function addToCart(id){
// check if product already exist in cart
if(cart.some((item) => item.id === id)){
  alert("product is already exist")
}
else{
const item = product.find((product) => product.id === id )
cart.push({...item, numberOfUnits: 1,});
console.log(cart);
}
updateCart();
}

// upadateCart function
function updateCart(){
renderCartItems();
renderSubTotal();
localStorage.setItem("CART", JSON.stringify(cart));
}

// calculate rendersubtotal
function renderSubTotal(){
let  totalItems = 0,
totalPrice = 0;
cart.forEach((item) => {
  totalItems += item.numberOfUnits;
  totalPrice += item.price * item.numberOfUnits;
});
console.log(totalPrice);
subTotalEL.innerHTML = `Number of Items (${totalItems}) = TotalPrice ₹${totalPrice}`;
itemNoInCart.innerHTML = `${totalItems}`;
}

// render cart items
function renderCartItems(){
  cartItemEl.innerHTML ="";
  cart.forEach((item) => {
    cartItemEl.innerHTML += `
  <div class="cart-item">
    <div class="item-info">
    <img src="${item.imgSrc}" alt="t-shirt-images">
        <h4>${item.name}</h4>
    </div>
    <div class="unit-price">
        <small>${item.price}</small>
    </div>
  <div class="units">
      <div class="btn minus" onClick="changeNumberOfUnits('minus',${item.id})">-</div>
      <div class="number" id="count-number">${item.numberOfUnits}</div>
      <div class="btn plus" onClick="changeNumberOfUnits('plus',${item.id})">+</div>
  </div>
  <div class="remove-item-icon" onclick="removeCartItems(${item.id})">
  <i class="fa-solid fa-xmark"></i>
  </div>
</div>
    `;
  });
}

// on click  icrement of product count
function changeNumberOfUnits(action, id){
cart = cart.map((item) =>{
let numberOfUnits = item.numberOfUnits;
if(item.id === id){
if(action === "minus" && numberOfUnits > 1){
  numberOfUnits--;
}
else if(action ==="plus" && numberOfUnits < item.instock){
  numberOfUnits++;
}
}
return{
...item,
numberOfUnits,
};
});
updateCart();
}

// on close remove cart items
function removeCartItems(id){
cart = cart.filter((item) => item.id !== id);
updateCart();
}




