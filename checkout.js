let cart = JSON.parse(localStorage.getItem('cart')) || [];

// Рендер корзины
function renderCart() {
  const cartItems = document.getElementById('cart-items');
  const totalPrice = document.getElementById('total-price');
  cartItems.innerHTML = '';
  let total = 0;
  cart.forEach(p => {
    total += p.price * (p.qty || 1);
    const div = document.createElement('div');
    div.classList.add('cart-item');
    div.innerHTML = `<span>${p.name} x${p.qty||1}</span><span>${p.price*(p.qty||1)} ₸</span>`;
    cartItems.appendChild(div);
  });
  totalPrice.textContent = total + " ₸";
}
renderCart();

// Шаги
const steps = document.querySelectorAll('.step-form');
const stepIndicators = document.querySelectorAll('.progress-bar .step');
let currentStep = 0;

document.querySelectorAll('.btn-next').forEach(btn => {
  btn.addEventListener('click', () => {
    steps[currentStep].classList.remove('active-step');
    stepIndicators[currentStep].classList.remove('active');
    currentStep++;
    steps[currentStep].classList.add('active-step');
    stepIndicators[currentStep].classList.add('active');
  });
});

// Переход на WhatsApp после подтверждения
document.getElementById('order-form').addEventListener('submit', function(e){
  e.preventDefault();
  let name = this.querySelector('input[type=text]').value;
  let phone = this.querySelector('input[type=tel]').value;
  let address = this.querySelector('input[type=text]:nth-of-type(2)').value;
  let total = document.getElementById('total-price').textContent;

  let message = `Здравствуйте! Я хочу оформить заказ.\nИмя: ${name}\nТелефон: ${phone}\nАдрес: ${address}\nТовары:\n`;
  cart.forEach(p => {
    message += `- ${p.name} x${p.qty||1} = ${p.price*(p.qty||1)} ₸\n`;
  });
  message += `Итого: ${total}`;

  let whatsappNumber = '77006730968';
  window.open(`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`, '_blank');

  localStorage.removeItem('cart');
});

const whatsappBtn = document.getElementById('whatsapp-btn');

document.getElementById('order-form').addEventListener('submit', function(e){
  e.preventDefault();

  let name = this.querySelector('input[type=text]').value;
  let phone = this.querySelector('input[type=tel]').value;
  let address = this.querySelector('input[type=text]:nth-of-type(2)').value;
  let total = document.getElementById('total-price').textContent;

  let message = `Здравствуйте! Я хочу оформить заказ.\nИмя: ${name}\nТелефон: ${phone}\nАдрес: ${address}\nТовары:\n`;
  cart.forEach(p => {
    message += `- ${p.name} x${p.qty||1} = ${p.price*(p.qty||1)} ₸\n`;
  });
  message += `Итого: ${total}`;

  let whatsappNumber = '77006730968'; 
  let link = `https://wa.me/${77006730968}?text=${encodeURIComponent(message)}`;

  // Показываем кнопку и вставляем ссылку
  whatsappBtn.style.display = 'block';
  whatsappBtn.href = link;

  // Можно очистить корзину
  localStorage.removeItem('cart');
});
