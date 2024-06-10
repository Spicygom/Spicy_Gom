let cart = JSON.parse(localStorage.getItem('cart')) || [];

function addToCart(productName, productPrice) {
    const existingProductIndex = cart.findIndex(item => item.name === productName);
    
    if (existingProductIndex > -1) {
        cart[existingProductIndex].quantity += 1;
    } else {
        cart.push({ name: productName, price: productPrice, quantity: 1 });
    }
    
    updateCart();
}

function removeFromCart(productName) {
    cart = cart.filter(item => item.name !== productName);
    updateCart();
}

function updateCart() {
    localStorage.setItem('cart', JSON.stringify(cart));
    loadCart();
}

function editQuantity(productName) {
    const newQuantity = prompt('Ingresa la nueva cantidad:', 1);
    if (newQuantity !== null) {
        const productIndex = cart.findIndex(item => item.name === productName);
        if (productIndex > -1 && !isNaN(newQuantity) && newQuantity > 0) {
            cart[productIndex].quantity = parseInt(newQuantity, 10);
            updateCart();
        }
    }
}

function loadCart() {
    const cartTableBody = document.querySelector('#cart-table tbody');
    cartTableBody.innerHTML = '';

    let total = 0;
    cart.forEach(item => {
        total += item.price * item.quantity;
        
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${item.name}</td>
            <td>$${item.price.toFixed(2)}</td>
            <td>${item.quantity}</td>
            <td>
                <button onclick="removeFromCart('${item.name}')">Eliminar</button>
            </td>
            <td>
                <button onclick="editQuantity('${item.name}')">Editar</button>
            </td>
        `;
        cartTableBody.appendChild(row);
    });

    document.getElementById('cart-total').textContent = `${total.toFixed(2)}`;
}

document.addEventListener('DOMContentLoaded', loadCart);
