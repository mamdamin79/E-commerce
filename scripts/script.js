// CDN of swiperjs library for creating products section carousel
import Swiper from 'https://unpkg.com/swiper@8/swiper-bundle.esm.browser.min.js'

// Selectors
let searchIcon = document.querySelector(".search-icon");
let searchForm = document.querySelector(".search-form");
let shoppingButton = document.querySelector(".shopping-cart-icon");
let shoppingCart = document.querySelector(".shopping-cart");
let usergButton = document.querySelector(".user-icon");
let loginForm = document.querySelector(".login-form");
let menuButton = document.querySelector(".menu-icon");
let sideMneu = document.querySelector("#side-menu");
let cartContainer = document.querySelector(".shopping-cart")



// global variables
const firstRow = document.querySelector(".first-row");
const secondRow = document.querySelector(".second-row");
// productsInCart is an array of products that contains wich user add to cart - with quantity of them
let productsInCart = [];
// products is an array of object which EACH object is a product - GET products from fake store API
let products = [];





// event handlers

searchIcon.addEventListener("click",()=>{
  searchForm.classList.toggle("active")
  sideMneu.classList.remove("active")
  loginForm.classList.remove("active")
  shoppingCart.classList.remove("active")
})

shoppingButton.addEventListener("click",()=>{
    shoppingCart.classList.toggle("active")
    sideMneu.classList.remove("active")
    loginForm.classList.remove("active")
    searchForm.classList.remove("active")
})

usergButton.addEventListener("click",()=>{
    loginForm.classList.toggle("active")
    sideMneu.classList.remove("active")
    shoppingCart.classList.remove("active")
    searchForm.classList.remove("active")
})

menuButton.addEventListener("click",()=>{
    sideMneu.classList.toggle("active")
    loginForm.classList.remove("active")
    shoppingCart.classList.remove("active")
    searchForm.classList.remove("active")
})

window.addEventListener("scroll",()=>{
    sideMneu.classList.remove("active")
    loginForm.classList.remove("active")
    shoppingCart.classList.remove("active")
    searchForm.classList.remove("active")

})



//this is an event handler in cart for EACH item and remove them from productsInCart
const trashHandler = (e) => {
  let clickedProductId = e.target.parentElement.parentElement.id;
  productsInCart = productsInCart.filter(product => product.id !== Number(clickedProductId))
  console.log(Array.from(firstRow.children).find(slide => slide.id == Number(clickedProductId)).lastElementChild.innerHTML = "add to cart")
  cartContainer.innerHTML = ""
  if(productsInCart.length == 0) {
    cartContainer.innerHTML = "<p> there is no product in cart</p>"
  }

  productsInCart.map(product => itemCreator(product))
  if(productsInCart.length > 0) {
    let chekout = document.createElement("button")
    chekout.className = "btn"
    chekout.innerHTML = "Chekout"
    cartContainer.appendChild(chekout)
  }
}
// this function is an event handler in cart and add quantity of EACH product
const plusHandler = (e) => {
  let clickedProductId = e.target.parentElement.parentElement.id;
  let clickedProductIndex = productsInCart.findIndex(product => product.id === Number(clickedProductId));
  productsInCart[clickedProductIndex].quantity += 1
  cartContainer.innerHTML = ""
  productsInCart.map(product => itemCreator(product))
  let chekout = document.createElement("button")
  chekout.className = "btn"
  chekout.innerHTML = "Chekout"
  cartContainer.appendChild(chekout)
}

// this function is an event handler for minuse button in cart and reduce quantity
const minuseHandler = (e) => {
  let clickedProductId = e.target.parentElement.parentElement.id;
  let clickedProductIndex = productsInCart.findIndex(product => product.id === Number(clickedProductId));
  if (productsInCart[clickedProductIndex].quantity >1){
    cartContainer.innerHTML = ""
    productsInCart[clickedProductIndex].quantity -= 1
    productsInCart.map(product=> itemCreator(product))
    let chekout = document.createElement("button")
    chekout.className = "btn"
    chekout.innerHTML = "Chekout"
    cartContainer.appendChild(chekout)

  }


  
}

// this function create items in cart
const itemCreator = (product) =>{
  let item = document.createElement("div")
  item.className = "item"
  item.id = `${product.id}`
  let itemImage = document.createElement("img")
  itemImage.src = `${product.image}`
  item.appendChild(itemImage)
  let itemContent = document.createElement("div")
  itemContent.className = "content"
  let itemTitle = document.createElement('h3')
  itemTitle.innerHTML = `${product.title.split(" ")[0] + product.title.split(" ")[1]}`
  let itemPrice = document.createElement('span')
  itemPrice.innerHTML = `${product.price}`
  itemPrice.className = "price"
  itemContent.appendChild(itemTitle)
  itemContent.appendChild(itemPrice)
  item.appendChild(itemContent)
  cartContainer.appendChild(item)
  let minuseBtn = document.createElement('button')
  minuseBtn.addEventListener('click',minuseHandler)
  minuseBtn.className = "minuse"
  minuseBtn.innerHTML = '<i class="uil uil-minus"></i>'
  let itemQuantity = document.createElement("Span")
  itemQuantity.className = "quantity"
  itemQuantity.innerHTML = `${product.quantity}`
  item.appendChild(minuseBtn)
  item.appendChild(itemQuantity)
  let plusBtn = document.createElement("button")
  plusBtn.addEventListener("click",plusHandler)
  plusBtn.className = "plus"
  plusBtn.innerHTML = '<i class="uil uil-plus"></i>'
  item.appendChild(plusBtn)
  let trashBtn = document.createElement("button")
  trashBtn.addEventListener("click",trashHandler)
  trashBtn.className = "trash"
  trashBtn.innerHTML = '<i class="uil uil-trash-alt"></i>'
  item.appendChild(trashBtn)
}

// this function is ad event listener for add to cart button in product box
const addToCartHandler = (e) => {
  let productId = e.target.parentElement.id
  e.target.innerHTML = "exist in cart";
  let objectOfProduct = products.find(product => product.id === Number(productId))
  if (!productsInCart.includes(objectOfProduct)){
    console.log(objectOfProduct)
    objectOfProduct.quantity = 1
    productsInCart.push(objectOfProduct)
    console.log(productsInCart)
    cartContainer.innerHTML = ""
    productsInCart.map(product =>itemCreator(product))
    let chekout = document.createElement("button")
    chekout.className = "btn"
    chekout.innerHTML = "Chekout"
    cartContainer.appendChild(chekout)
  }
  else{
    console.log("toastify")
  }
}


// when dom load successfully fetch product from fakestoreapi and show them in product section
window.addEventListener("DOMContentLoaded", async () => {
  const response = await fetch('https://fakestoreapi.com/products')
  products = await response.json();
  console.log(products);
  products.map(product =>boxCreator(product));
})

// this function will call when dom content load to creat box for EACH product
const boxCreator = (product)=>{
  let swiperSlide = document.createElement('div');
    swiperSlide.id = `${product.id}`
    swiperSlide.classList = "swiper-slide box"
    let swiperSlideImage = document.createElement('img');
    let swiperSlideTitle = document.createElement('h3')
    swiperSlideTitle.innerHTML = `${product.title.split(" ")[0] + product.title.split(" ")[1]}`
    swiperSlideImage.src = `${product.image}`
    let swiperSlideCost = document.createElement("div");
    swiperSlideCost.className = "cost";
    swiperSlideCost.innerHTML = `$ ${product.price}`
    let swiperAddToCart = document.createElement("div");
    swiperAddToCart.addEventListener("click",addToCartHandler)
    swiperAddToCart.className = "add-to-cart"
    swiperAddToCart.innerText = "add to cart";
    swiperSlide.appendChild(swiperSlideImage)
    swiperSlide.appendChild(swiperSlideTitle)
    swiperSlide.appendChild(swiperSlideCost)
    swiperSlide.appendChild(swiperAddToCart)
    firstRow.appendChild(swiperSlide)

}


// create carousel with swiperjs library for product section
const swiper = new Swiper('.swiper', {
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
  slidesPerView: 4,
  spaceBetween: 20,
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
  dragAble: false,
  breakpoints:{
    "0": {
      slidesPerView: 1,
      spaceBetween: 10,
    },
    "523": {
      slidesPerView: 2,
      spaceBetween: 15,
    },
    "764" : {
      slidesPerView: 3,
      spaceBetween: 20,

    },
    "1145":{
      slidesPerView: 4,
      spaceBetween: 20,

    }
    
  }

})
