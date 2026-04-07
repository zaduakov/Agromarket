let products = [
    { id:1, name:"Саженцы помидоров", price:400, category:"plants", img:"images/помидоры.webp" },
    { id:2, name:"Огурцы", price:500, category:"plants", img:"images/огурцы.webp" },
    { id:3, name:"Яблоня", price:2000, category:"trees", img:"images/Яблоня саженец.jpeg" },
    { id:4, name:"Персик", price:1500, category:"trees", img:"images/Персик.webp" },
    { id:5, name:"Красный перец", price:900, category:"plants", img:"images/Красный перец.webp" },
    { id:6, name:"Клубника", price:1300, category:"plants", img:"images/Клубника.webp" },
    { id:7, name:"Картофель", price:350, category:"vegetables", img:"images/картоп.webp" },
    { id:8, name:"Лук", price:300, category:"vegetables", img:"images/Лук.webp" },
    { id:9, name:"Морковь", price:400, category:"vegetables", img:"images/Морковка.webp" },
    { id:10, name:"Сыр", price:2700, category:"Dairy products", img:"images/Сыр.webp" },
    { id:11, name:"Сыр деревенский", price:3000, category:"Dairy products", img:"images/Сыр деревенский.jpeg" },
    { id:12, name:"Кефир", price:800, category:"Dairy products", img:"images/Кефир.jpg" },
    { id:13, name:"Мясо Говядина", price:2700, category:"meat", img:"images/Мясо.webp" },
    { id:14, name:"Мясо Баранина", price:2500, category:"meat", img:"images/Мясо баранина.jpg" },
    { id:15, name:"Мясо Куриное", price:2200, category:"meat", img:"images/Курица.webp" },
    { id:16, name:"Масло", price:900, category:"Dairy products", img:"images/Маслоо.webp" },
    { id:17, name:"Молоко", price:700, category:"Dairy products", img:"images/Молоко.jpg" },
    { id:18, name:"қымыз", price:1500, category:"Dairy products", img:"images/Кумыс.jpg" },
    { id:19, name:"құрт", price:1000, category:"Dairy products", img:"images/Курт.webp" },
    { id:20, name:"қымыран", price:1200, category:"Dairy products", img:"images/Кымыран.webp" }
  ];
  
  let filteredProducts = [...products];
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  
  document.getElementById("checkoutBtn").addEventListener("click", () => {
    window.location.href = "checkout.html";
  });
  // ===== РЕНДЕР =====
  function render(list){
    const c = document.getElementById("products");
  
    c.style.opacity = 0;
  
    setTimeout(()=>{
      c.innerHTML = "";
  
      list.forEach(p=>{
        c.innerHTML += `
          <div class="card fade-in">
            <img src="${p.img}">
            <div>${p.name}</div>
            <div class="price">${p.price}</div>
            <button onclick='addToCart(${JSON.stringify(p)}, event)'>Купить</button>
          </div>
        `;
      });
      c.style.opacity = 1;
  
    }, 200);
  }
  
  // ===== ПОИСК =====
  const searchInput = document.getElementById("searchInput");
  
  searchInput.addEventListener("input", ()=>{
    const val = searchInput.value.toLowerCase();
  
    filteredProducts = products.filter(p =>
      p.name.toLowerCase().includes(val)
    );
  
    render(filteredProducts);
  });
  
  // ===== КАТЕГОРИИ =====
  function filterCategory(cat){

    filteredProducts = (cat==="all")
      ? products
      : products.filter(p=>p.category===cat);
  
    render(filteredProducts);
  
    // 🔥 активная кнопка
    document.querySelectorAll('.categories span').forEach(el=>{
      el.classList.remove('active');
    });
  
    event.target.classList.add('active');
  }
  //Карзина
  function toggleCart(){
    const cart = document.getElementById("miniCart");
    const overlay = document.getElementById("overlay");
  
    cart.classList.toggle("open");
    overlay.classList.toggle("active");
  }
  
  function addToCart(product, event){
    let exist = cart.find(p=>p.id===product.id);
  
    if(exist) exist.qty++;
    else cart.push({...product, qty:1});
  
    saveCart();
    updateCart();
  
    // 🔥 анимация
    const img = event.target.closest('.card').querySelector('img');
    const flyingImg = img.cloneNode();
  
    flyingImg.style.position = "fixed";
    flyingImg.style.zIndex = "999";
    flyingImg.style.width = "50px";
    flyingImg.style.borderRadius = "50%";
  
    const rect = img.getBoundingClientRect();
    flyingImg.style.left = rect.left + "px";
    flyingImg.style.top = rect.top + "px";
  
    document.body.appendChild(flyingImg);
  
    const cartIcon = document.querySelector(".cart-btn").getBoundingClientRect();
  
    flyingImg.animate([
      { top: rect.top + "px", left: rect.left + "px", opacity: 1 },
      { top: cartIcon.top + "px", left: cartIcon.left + "px", opacity: 0 }
    ], {
      duration: 700,
      easing: "ease-in-out"
    });
  
    setTimeout(()=>flyingImg.remove(), 700);
  }
  
  function changeQty(id, delta){
    let item = cart.find(p=>p.id===id);
  
    if(!item) return;
  
    item.qty += delta;
  
    if(item.qty <= 0){
      cart = cart.filter(p=>p.id!==id);
    }
  
    saveCart();
    updateCart();
  }
  
  function updateCart(){
    const cartItems = document.getElementById("cartItems");
    const total = document.getElementById("cartTotal");
    const count = document.getElementById("cartCount");
  
    let sum = 0;
    let totalItems = 0;
  
    cartItems.innerHTML = "";
  
    cart.forEach(p=>{
      sum += p.price * p.qty;
      totalItems += p.qty;
  
      cartItems.innerHTML += `
        <div class="cart-item">
          <div>
            <b>${p.name}</b><br>
            ${p.price} ₸
          </div>
  
          <div>
            <button onclick="changeQty(${p.id}, -1)">-</button>
            ${p.qty}
            <button onclick="changeQty(${p.id}, 1)">+</button>
          </div>
        </div>
      `;
    });
  
    total.textContent = sum;
    count.textContent = totalItems;
  }
  function saveCart(){
    localStorage.setItem("cart", JSON.stringify(cart));
  }
  
  // ===== СТАРТ =====
  render(products);
  updateCart();
  // показать через 2 секунды
setTimeout(() => {
  document.getElementById("wa-popup").classList.add("show");
}, 2000);

// закрыть popup
function closePopup() {
  document.getElementById("wa-popup").style.display = "none";
}

// клик по popup → WhatsApp
document.getElementById("wa-popup").onclick = () => {
  window.open("https://api.whatsapp.com/send?phone=77006730968&text=Здравствуйте,%20я%20хочу%20заказать", "_blank");
};

function sendOrderToTelegram() {
  if (cart.length === 0) {
    alert("Корзина пуста!");
    return;
  }

  let token = "8686042743:AAE-Hn4QJmsW5WVLpx7uWBxfZWHEhFHrtr4";
  let chat_id = "7666224126";

  let message = "🛒 Новый заказ:\n\n";
  
  let total = 0;

  cart.forEach(item => {
    message += `${item.name} (${item.qty} шт) = ${item.price * item.qty}₸\n`;
    total += item.price * item.qty;
  });

  message += `\n💰 Итого: ${total}₸`;

  let url = `https://api.telegram.org/bot${token}/sendMessage`;

  fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      chat_id: chat_id,
      text: message
    })
  })
  .then(() => {
    alert("Заказ отправлен!");
  })
  .catch(() => {
    alert("Ошибка отправки!");
  });
}
