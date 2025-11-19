
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

