function menuShow(){
    let menuMobile = document.querySelector('.mobile-menu');
    if (menuMobile.classList.contains('open')) {
        menuMobile.classList.remove('open');
        document.querySelector('.icon').src = "image/menu_white_36dp.svg";
    } else {
        menuMobile.classList.add('open');
        document.querySelector('.icon').src = "image/close_white_36dp.svg";
    }
}

    
document.addEventListener('DOMContentLoaded', function () {
    const addToCartButtons = document.querySelectorAll('.add-to-cart');
    const cartItemsList = document.getElementById('cart-items');
    const totalParagraph = document.getElementById('total');
    const clearCartButton = document.getElementById('clear-cart');
  
    let cart = [];
    let total = 0;
  
    addToCartButtons.forEach(button => {
      button.addEventListener('click', function () {
        const menuItem = button.parentElement;
        const itemName = menuItem.dataset.name;
        const itemPrice = parseFloat(menuItem.dataset.price);
  
        cart.push({ name: itemName, price: itemPrice });
        total += itemPrice;
  
        updateCart();
      });
    });
  
    function updateCart() {
      cartItemsList.innerHTML = '';
      cart.forEach(item => {
        const li = document.createElement('li');
        li.textContent = `${item.name} - R$ ${item.price}`;
        cartItemsList.appendChild(li);
      });
  
      totalParagraph.textContent = `Total: R$ ${total.toFixed(2)}`;
      const checkoutButton = document.getElementById('checkout');
    if (cart.length > 0) {
    checkoutButton.removeAttribute('disabled');
    } else {
    checkoutButton.setAttribute('disabled', 'disabled');
    }
    }
    clearCartButton.addEventListener('click', function () {
      cart = []; 
      total = 0; 
      updateCart(); 
    });
  
    function formatOrder(cart,address,paymentMethod) {
        let orderText = "Pedido:\n";
        cart.forEach(item => {
          orderText += `${item.name} - R$ ${item.price}\n`;
        });
        orderText += `Total: R$ ${total.toFixed(2)}\n`;
        orderText += `Endereço de entrega : ${address}\n`;
        orderText += `Forma de pagamento: ${paymentMethod}`;
    
        const phoneNumber = "5511999999999"; 
        const encodedOrderText = encodeURIComponent(orderText);
        const whatsappLink = `https://api.whatsapp.com/send?phone=${phoneNumber}&text=${encodedOrderText}`;
    
        return whatsappLink;
      }
    
      document.getElementById('checkout').addEventListener('click', function () {
        const address = document.getElementById('address').value;
        const paymentMethod = document.getElementById('payment-method').value;
        const whatsappLink = formatOrder(cart, address, paymentMethod);
        window.open(whatsappLink);
      });
  });
  document.addEventListener('DOMContentLoaded', function() {
    const orderButton = document.querySelector('.button-pedido button');

    orderButton.addEventListener('click', function() {
        const cartElement = document.querySelector('.cart');

        if (cartElement) {
            const cartPosition = cartElement.getBoundingClientRect().top + window.scrollY;

            window.scrollTo({
                top: cartPosition,
                behavior: 'smooth'
            });
        } else {
            console.error('Elemento .cart não encontrado.');
        }
    });
});
  
  
