let products = [
    { id:1, name:"Саженцы помидоров", price:1500, category:"plants", img:"images/помидоры.webp" },
    { id:2, name:"Огурцы", price:1200, category:"vegetables", img:"images/огурцы.webp" },
    { id:3, name:"Яблоня", price:5000, category:"trees", img:"images/Яблоня.webp" },
    { id:4, name:"Персик", price:5000, category:"trees", img:"images/Персик.webp" },
    { id:5, name:"Красный перец", price:5000, category:"plants", img:"images/Красный перец.webp" },
    { id:6, name:"Клубника", price:5000, category:"plants", img:"images/Клубника.webp" }
]
  let filteredProducts = [...products];
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  
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

  function goCheckout(){
    window.location.href = "checkout.html";
  }
