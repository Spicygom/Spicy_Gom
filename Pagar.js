function showPaymentOptions() {
    var paymentMethod = document.getElementById('payment-method').value;
    var additionalOptions = document.getElementById('additional-options');
    var creditCardInfo = document.getElementById('credit-card-info');

    // Limpiar 
    additionalOptions.innerHTML = '';
    creditCardInfo.innerHTML = '';
    additionalOptions.style.display = 'none';
    creditCardInfo.style.display = 'none';

    if(paymentMethod === 'mercado_pago') {
    
        additionalOptions.innerHTML = `
            <label>Opciones de Mercado Pago:</label>
            <select id="mercado-pago-options" name="mercado-pago-options">
                <option value="oxxo">OXXO</option>
                <option value="seveneleven">SevenEleven</option>
                <option value="santander">Santander</option>
                <option value="citibanamex">Citibanamex</option>
                <option value="chedraui">Chedraui</option>
            </select>
        `;
        additionalOptions.style.display = 'block';
    } else if(paymentMethod === 'card') {
      
        creditCardInfo.innerHTML = `
            <label>Número de Tarjeta:</label>
            <input type="text" id="card-number" name="card-number" required>
            <label>Nombre del Titular:</label>
            <input type="text" id="cardholder-name" name="cardholder-name" required>
            <label>MM/AA:</label>
            <input type="text" id="card-expiry" name="card-expiry" required>
            <label>CVV:</label>
            <input type="text" id="card-cvv" name="card-cvv" required>
        `;
        creditCardInfo.style.display = 'block';
    }   
}

function updateConfirmButtonState() {
    var address = document.getElementById('address').value;
    var paymentMethod = document.getElementById('payment-method').value;
    var cardNumber = document.getElementById('card-number');
    var cardholderName = document.getElementById('cardholder-name');
    var cardExpiry = document.getElementById('card-expiry');
    var cardCvv = document.getElementById('card-cvv');
    var confirmPurchase = document.getElementById('confirm-purchase');

    // Habilitar o deshabilitar el botón de confirmar compra
    confirmPurchase.disabled = !address || (paymentMethod === 'card' && (
        !cardNumber || !cardNumber.value ||
        !cardholderName || !cardholderName.value ||
        !cardExpiry || !cardExpiry.value ||
        !cardCvv || !cardCvv.value
    ));
}
document.getElementById('address').addEventListener('input', updateConfirmButtonState);
if(document.getElementById('card-number')) {
    document.getElementById('card-number').addEventListener('input', updateConfirmButtonState);
    document.getElementById('cardholder-name').addEventListener('input', updateConfirmButtonState);
    document.getElementById('card-expiry').addEventListener('input', updateConfirmButtonState);
    document.getElementById('card-cvv').addEventListener('input', updateConfirmButtonState);
}

document.getElementById('address').addEventListener('input', updateConfirmButtonState);
document.getElementById('payment-form').addEventListener('input', updateConfirmButtonState);
document.getElementById('payment-form').addEventListener('submit', function(event) {
  event.preventDefault();
  alert('Compra confirmada. Mostrando ticket...');
  
  const cart = JSON.parse(localStorage.getItem('cart')) || [];
  const paymentMethod = document.getElementById('payment-method').value;
  
  const ticketData = {
    date: new Date(),
    ticketNumber: '000123456',
    items: cart,
    paymentMethod: paymentMethod,
    subtotal: cart.reduce((sum, item) => sum + item.price * item.quantity, 0)
  };
  
  localStorage.setItem('ticketData', JSON.stringify(ticketData));
  window.location.href = 'Ticket.html';
});

