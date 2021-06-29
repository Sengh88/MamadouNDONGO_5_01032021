/* ****************GETTING AND PARSING LOCALSTORAGE INFO***************** */

//contact object
let contactObj = JSON.parse(localStorage.getItem("contactObject"));

//array of camera objects
let camArray = JSON.parse(localStorage.getItem("camArray"));

/* ***************CREATING FINAL OBJECT TO POST TO BACKEND**************** */
let finalObj = {};
//storing contact info object inside the final object
finalObj.contact = contactObj;

//creating an array of camera ids
let camIdArray = (function createCamIdArr() {
  let array = [];
  for (i = 0; i < camArray.length; i++) {
    array.push(camArray[i].cam_id);
  }
  return array;
})();

//storing camera id array inside the final object
finalObj.products = camIdArray;

/* *****************POSTING FINAL OBJECT****************** */
camerasUrl = `http://localhost:3000/api/cameras/order`;

var xhr = new XMLHttpRequest();

xhr.open("POST", camerasUrl, true);

xhr.onload = function () {
  if (this.status == 201) {
    var order = JSON.parse(this.responseText);
    let successMsg = document.querySelector(".success-message");
    successMsg.textContent =
      "Merci pour votre achat  " +
      order.contact.firstName +
      " " +
      order.contact.lastName +
      ". Votre numéro de commande est le suivant: " +
      order.orderId +
      ".";
  } else {
  }
};

xhr.setRequestHeader("Content-type", "application/json");
xhr.send(JSON.stringify(finalObj));

localStorage.clear();
