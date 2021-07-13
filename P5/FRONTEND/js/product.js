//Call ID
const cardHolder = document.querySelector('.card__holder')
const counter = document.querySelector('.cart-icon')
const outerLoader= document.querySelector('.loader__outer')
const lensesContainer = document.querySelector('.lenses__container')

outerLoader.style.visibility = "visible"




const fetchOne = async () => {
  const _id = new URLSearchParams(window.location.search).get('id') 
  const url = `http://localhost:3000/api/cameras/${_id}`
  console.log(url);
  try{
      const data = await fetch(url)
      const response = await data.json()
      const{ name ,description,imageUrl,price, lenses ,_id } = response
      
      outerLoader.style.display = "none"
      cardHolder.innerHTML =`
      <article class="card">
          <div class="card__img">
              <img src="${imageUrl}" alt="${name}">
          </div>
          <div class="card__info">
               <h3>${name}</h3>
              <p>Prix <strong>${price / 100}$</strong> </p>
              
          </div>
          <div>
              <p>${description}</p>
          <div>
          <button class= "panier-btn" data-id=${_id} data-price =${price /100}>Ajouter au panier</button>
          
          </article>
          `   
          lenses.forEach(arg =>{
          lensesContainer.innerHTML +=`
              <input type="checkbox" name="${arg}" value="${arg}"> 
              <label>${arg}</label><br>'
              `
          }) 
          
          addProduct(response)
  }catch(err){
      throw new Error(`Well something wrong happend\n ${err}`)
  }
}

fetchOne()

function addProduct (data) {
  const panierBtn = document.querySelector('.panier-btn')
  const product = {
    id: data._id,
    imageUrl: data.imageUrl,
    name: data.name,
    price: data.price,
    description: data.description,
    quantity: 1,
    
 }
 console.log(product);
 panierBtn.addEventListener('click', function (e) {
   e.preventDefault();
  
   //Récupération du panier ou création d'un panier vide

   const productInLocalStorage = JSON.parse(localStorage.getItem("products") || "[]");
   
  

   //On vérifie si le produit est déjà dans le panier ==> si oui on incrémente la quantité si non on l'ajoute

   const found = productInLocalStorage.find((element) => element.id === data._id);
   if (found) {
     found.quantity++;
    
   } else {
     productInLocalStorage.push(product);
     
   }
   localStorage.setItem("products", JSON.stringify(productInLocalStorage));
   alert("Ce produit a été ajouté à votre panier.");
   window.location.reload();
   
 })
}






  