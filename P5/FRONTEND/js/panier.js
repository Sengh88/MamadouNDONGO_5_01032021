let objet = localStorage.getItem("products")

let objJson = JSON.parse(objet)
console.log(objJson);

if (objet == '{}' || objet == null || objet == "[]" ) {
let message = 
`
     <p> Votre panier est vide </p> 
`
document.getElementById("panier").innerHTML = message;
} 
else {
    
    const tableau = document.getElementById("tab");
    for(let i = 0; i < objJson.length; i++) {
        console.log(objJson[i].name);
        const tr = document.createElement("tr");

        
        // affichage du nom dans le panier 
        const $th0 = document.createElement("th");
        $th0.innerHTML = objJson[i].name;
        tr.appendChild($th0);
        console.log($th0);
        console.log(tr)
        
        //affichage de la quantité et modification de la quantité
        const $th1 = document.createElement("th");
        const $input = document.createElement("input");
        $input.type = "number";
        $input.defaultValue = objJson[i].quantity; 
        $input.min = "1";
        const index = i; 
        $input.addEventListener("change", function() {
            AjoutProduit(index, this.value);
        });
        $th1.appendChild($input);
        tr.appendChild($th1); 
        //affichage du prix unitaire 
        const $th2 = document.createElement("th"); 
        $th2.innerHTML = objJson[i].price/100;
        tr.appendChild($th2);
        // Affichage du prix total. 
        const $th3 = document.createElement("th");
        $th3.id = `priceTotal-${i}`;
        $th3.innerHTML = `${objJson[i].priceTotal} €`;
        tr.appendChild($th3);
    
        const $thS = document.createElement("th"); 
        const $button = document.createElement("button");
        $button.innerHTML = `Supprimer l'article` 
        $button.classList = "btn btn-outline-danger";
        $button.addEventListener("click", function() {
            deleteItem(index);
        });
        $thS.appendChild($button);
        tr.appendChild($thS);


        tableau.append(tr); 

    }
}
function Valid () {
    if(document.forms.CommandForm != "") {
        console.log("hy"); 
        const contact = {
            firstName: document.getElementById("nom").value, 
            lastName: document.getElementById("prenom").value,
            email: document.getElementById("adressem").value, 
            address: document.getElementById("adresse").value, 
            city: document.getElementById("ville").value
        };
        const products = objJson.map(function(camera){return camera.id})
        console.log(products);
        const command = {contact, products};
        console.log(command);
        const options = {
          method: "POST",
          body: JSON.stringify(command),
          headers: {
            "Content-Type" : "application/json"
        }
        };
        fetch('http://localhost:3000/api/cameras/order', options)
        .then(res => {
            console.log(res);
            return res.json()})
        .then(res => { 
          if (res.orderId) {
            alert(`Votre commande numéro ${res.orderId} à bien été passée.`)
            localStorage.setItem("orderId", res.orderId)
            localStorage.setItem("firstName", res.contact.firstName)
            window.location = `commande.html`
          } else {
            alert(`Erreur de commande`);
          }
        });
        
  }
    else {
        console.log("ho");
        alert("Veuillez remplir le formulaire");
    }
}

CalculTotal();
function CalculTotal() {
    let price = localStorage.getItem("products");
    let priceJson = JSON.parse(price);  
    let priceT = 0; 
    for (let i = 0; i < priceJson.length; i++) 
    {
        priceT = priceT + priceJson[i].priceTotal; 
    }
    document.getElementById("Total").innerHTML = ''; 
    document.getElementById("Total").innerHTML = `${priceT} €`
    console.log(priceT);
}

function AjoutProduit(index, valueQ) {
    console.log(index);
    objJson[index].quantity = valueQ;
    objJson[index].priceTotal = objJson[index].quantity*objJson[index].price;
    console.log(objJson[index].quantity, objJson[index].price)
    document.getElementById(`priceTotal-${index}`).innerHTML = `${objJson[index].priceTotal} € `;
    localStorage.setItem("products", JSON.stringify(objJson));
    CalculTotal();

}

function deleteItem (index) {
    delete objJson.splice(index, 1); 
    localStorage.setItem("products", JSON.stringify(objJson)); 
    location.reload();
}

