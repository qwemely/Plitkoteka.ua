
const content = document.getElementById('content');
const tabs = document.querySelectorAll('.tab');
const year = document.getElementById('year');
year.textContent = new Date().getFullYear();

let data = null;
let cart = JSON.parse(localStorage.getItem('plt_cart') || '[]');
let myStories = JSON.parse(localStorage.getItem('plt_mystories') || '[]');


fetch('main.json').then(r=>r.json()).then(json=>{
  data = json;
  openPage('pop');
})


tabs.forEach(t=>{
  t.addEventListener('click',()=>{
    tabs.forEach(x=>x.classList.remove('active'));
    t.classList.add('active');
    openPage(t.dataset.page);
  });
});

function openPage(page){
  if(!data && page !== 'mystories' && page !== 'cart') {
    content.innerHTML = '<div class="card"><p>Завантаження...</p></div>';
    return;
  }

  switch(page){
    case 'pop': renderPopular(); break;
    case 'listen': renderListen(); break;
    case 'mystories': renderMyStories(); break;
    case 'bookmarks': renderBookmarks(); break;
    case 'cart': renderCart(); break;
    default: content.innerHTML = '<p>Невідома сторінка</p>';
  }
}

const links = document.querySelectorAll(".main-nav a");
links.forEach(link => {
    if (link.href.includes(location.pathname.split('/').pop())) {
        link.classList.add("active");
    }
});





if (location.pathname.includes("mystories.html")) {
    const titleInput = document.getElementById("title");
    const contentInput = document.getElementById("content");


    const saved = JSON.parse(localStorage.getItem("myStory"));
    if (saved) {
        titleInput.value = saved.title;
        contentInput.value = saved.content;
    }


    window.saveStory = function () {
        const obj = {
            title: titleInput.value.trim(),
            content: contentInput.value.trim()
        };
        localStorage.setItem("myStory", JSON.stringify(obj));
        alert("Історію збережено!");
    };


    window.clearStory = function () {
        titleInput.value = "";
        contentInput.value = "";
        localStorage.removeItem("myStory");
        alert("Очищено!");
    };
}








if (location.pathname.includes("cart.html")) {

    const qtyInput = document.querySelector(".qty input");
    const orderBtn = document.querySelector(".btn-order");


    qtyInput?.addEventListener("input", () => {
        localStorage.setItem("cart_qty", qtyInput.value);
    });


    const savedQty = localStorage.getItem("cart_qty");
    if (savedQty) qtyInput.value = savedQty;


    orderBtn?.addEventListener("click", () => {
        alert("Замовлення оформлено (демо). Реальну оплату можна підключити через LiqPay, Fondy або Stripe.");
    });
}






function addToBookmarks(title) {
    let list = JSON.parse(localStorage.getItem("fav_stories")) || [];
    list.push(title);
    localStorage.setItem("fav_stories", JSON.stringify(list));
    alert("Додано в закладки!");
}


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

const eyes = document.querySelectorAll('.eye');
document.addEventListener('mousemove', (e) => {
  const { clientX, clientY } = e;
  eyes.forEach((eye) => {
    const rect = eye.getBoundingClientRect();
    const eyeX = rect.left + rect.width / 2;
    const eyeY = rect.top + rect.height / 2;
    const dx = clientX - eyeX;
    const dy = clientY - eyeY;
    const angle = Math.atan2(dy, dx);
    const distance = Math.min(5, Math.hypot(dx, dy) / 20);
    const x = Math.cos(angle) * distance;
    const y = Math.sin(angle) * distance;
    eye.style.transform = `translate(${x}px, ${y}px)`;
  });
});





document.body.style.opacity = "0";
setTimeout(() => {
    document.body.style.transition = "opacity .4s ease";
    document.body.style.opacity = "1";
}, 20);


const themeBtn = document.querySelector(".theme-toggle");


const savedTheme = localStorage.getItem("theme");
if (savedTheme === "dark") {
    document.body.classList.add("dark");
    if (themeBtn) themeBtn.textContent = "☀️";
}

themeBtn?.addEventListener("click", () => {
    document.body.classList.toggle("dark");

    if (document.body.classList.contains("dark")) {
        localStorage.setItem("theme", "dark");
        themeBtn.textContent = "☀️";
    } else {
        localStorage.setItem("theme", "light");
        themeBtn.textContent = "🌙";
    }
});
