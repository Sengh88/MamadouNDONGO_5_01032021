const order = JSON.parse(localStorage.getItem('order'))

const outerLoader= document.querySelector('.loader__outer')

const recapBtn = document.querySelector('.recap')
const { products } = order
const title = order.products.length == 1 ? 'VOTRE COMMANDE' : 'VOS COMMANDES'

const rendeOrder = document.querySelector('.render__order')
const orderId = document.querySelector(".order-id")


outerLoader.style.visibility = "visible"
// injection HTML
orderId.innerHTML= `NUMERO DE COMMANDE : ${order.orderId}`
outerLoader.remove()

