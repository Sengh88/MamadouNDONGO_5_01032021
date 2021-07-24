///// ///// ///// ///// PAGE CONFIRMATION ////// ///// ///// /////

// Confirmation de la commande
function addConfirmationOrder() {
    const orderId = localStorage.getItem("orderId");
    const firstName = localStorage.getItem("firstName")
    const messageConfirmation = document.getElementById("orderId");
    messageConfirmation.innerHTML = " Félicitations " + firstName + " Merci pour votre commande n° " + orderId ;
    const totalPrice = localStorage.getItem("totalOrder");
    const confirmationPrice = document.getElementById("total-price");
    confirmationPrice.innerHTML = "Prix total : " + totalPrice + " $";
    
}


// Vider le panier, le prix total et l'id de commande
function resetOrder() {
    buttonHome = document.getElementById('btn-confirmation');
    buttonHome.addEventListener('click', function () {
        localStorage.removeItem("orderId");
        localStorage.removeItem('products');
        localStorage.removeItem('totalOrder');
        window.location.href = "../../index.html";
    })
}


////////////////////////////////////APPEL DES FONCTIONS/////////////////////////////////////////////////
addConfirmationOrder()
resetOrder()