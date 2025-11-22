
const content = document.getElementById('content');
const tabs = document.querySelectorAll('.tab');
const year = document.getElementById('year');
year.textContent = new Date().getFullYear();

let data = null;
let cart = JSON.parse(localStorage.getItem('plt_cart') || '[]');
let myStories = JSON.parse(localStorage.getItem('plt_my_stories') || '[]');


fetch('main.json').then(r=>r.json()).then(json=>{
  data = json;
  openPage('popular');
})


tabs.forEach(t=>{
  t.addEventListener('click',()=>{
    tabs.forEach(x=>x.classList.remove('active'));
    t.classList.add('active');
    openPage(t.dataset.page);
  });
});

function openPage(page){
  if(!data && page !== 'my-stories' && page !== 'cart') {
    content.innerHTML = '<div class="card"><p>Завантаження...</p></div>';
    return;
  }

  switch(page){
    case 'popular': renderPopular(); break;
    case 'listen': renderListen(); break;
    case 'my-stories': renderMyStories(); break;
    case 'bookmarks': renderBookmarks(); break;
    case 'cart': renderCart(); break;
    default: content.innerHTML = '<p>Невідома сторінка</p>';
  }
}

/* main.js — глобальний JavaScript для всіх сторінок Plitkoteka */

/* -------------------------
   1) Автовизначення активного меню
------------------------- */
const links = document.querySelectorAll(".main-nav a");
links.forEach(link => {
    if (link.href.includes(location.pathname.split('/').pop())) {
        link.classList.add("active");
    }
});


/* -------------------------
   2) Локальне збереження «Мої історії»
------------------------- */
if (location.pathname.includes("mystories.html")) {
    const titleInput = document.getElementById("title");
    const contentInput = document.getElementById("content");

    // Завантаження при відкритті
    const saved = JSON.parse(localStorage.getItem("myStory"));
    if (saved) {
        titleInput.value = saved.title;
        contentInput.value = saved.content;
    }

    // Кнопка збереження
    window.saveStory = function () {
        const obj = {
            title: titleInput.value.trim(),
            content: contentInput.value.trim()
        };
        localStorage.setItem("myStory", JSON.stringify(obj));
        alert("Історію збережено!");
    };

    // Кнопка очистити
    window.clearStory = function () {
        titleInput.value = "";
        contentInput.value = "";
        localStorage.removeItem("myStory");
        alert("Очищено!");
    };
}


/* -------------------------
   3) Локальний кошик (cart.html)
------------------------- */
if (location.pathname.includes("cart.html")) {

    const qtyInput = document.querySelector(".qty input");
    const orderBtn = document.querySelector(".btn-order");

    // Слухаємо зміни кількості
    qtyInput?.addEventListener("input", () => {
        localStorage.setItem("cart_qty", qtyInput.value);
    });

    // Завантаження при вході
    const savedQty = localStorage.getItem("cart_qty");
    if (savedQty) qtyInput.value = savedQty;

    // Оформлення замовлення
    orderBtn?.addEventListener("click", () => {
        alert("Замовлення оформлено (демо). Реальну оплату можна підключити через LiqPay, Fondy або Stripe.");
    });
}


/* -------------------------
   4) Закладки (bookmarks.html)
------------------------- */
function addToBookmarks(title) {
    let list = JSON.parse(localStorage.getItem("fav_stories")) || [];
    list.push(title);
    localStorage.setItem("fav_stories", JSON.stringify(list));
    alert("Додано в закладки!");
}

// Відображення списку закладок
if (location.pathname.includes("bookmarks.html")) {
    const favList = document.querySelector(".fav-list");
    const fav = JSON.parse(localStorage.getItem("fav_stories")) || [];

    if (fav.length === 0) {
        favList.innerHTML = "<div class='fav'>Немає закладок 🙁</div>";
    } else {
        favList.innerHTML = fav
            .map(item => `<div class="fav">${item}</div>`)
            .join("");
    }
}


/* -------------------------
   5) Анімація плавної появи сторінки
------------------------- */
document.body.style.opacity = "0";
setTimeout(() => {
    document.body.style.transition = "opacity .4s ease";
    document.body.style.opacity = "1";
}, 20);
