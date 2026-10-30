const search = document.getElementById('search');
const shops = document.getElementById('shops');

let allProducts = [];

fetch('https://fakestoreapi.com/products')
    .then(response => response.json())
    .then(data => {
        allProducts = data;
        displayProducts(allProducts);
    });

function displayProducts(products) {
    shops.innerHTML = '';
    
    products.forEach(shop => {
        shops.innerHTML += `   
      <div class="box-dad">
          <img src="${shop.image}" alt="">
              <h1 class="h1-js">${shop.title}</h1>
              <p class="p-js">${shop.description.slice(0, 80)}...</p>   
              <div class="btn-js-dad">
                  <p class="money-js">$ ${shop.price}</p>
                  <button class="btn-js">Sotib olish</button>
              </div>
      </div>`;
    });
}


search.addEventListener('input', (e1) => {
    const t1 = e1.target.value.toLowerCase().trim();

    const filteredProducts = allProducts.filter(shop =>
        shop.title.toLowerCase().includes(t1)
    );

    displayProducts(filteredProducts);
});

const categorySelect = document.querySelectorAll('#bb')[0];

categorySelect.addEventListener('change', () => {
    const selectedCategory = categorySelect.value;

    if (selectedCategory === '') {
        displayProducts(allProducts);
    } else {
        const filtered = allProducts.filter(shop => shop.category === selectedCategory);
        displayProducts(filtered);
    }
});

const sortSelect = document.querySelectorAll('#bb')[1];

sortSelect.addEventListener('change', () => {
    let sorted = [...allProducts];
    const value = sortSelect.value;

    if (value === 'high') {
        sorted.sort((a, b) => b.price - a.price);
    } else if (value === 'low') {
        sorted.sort((a, b) => a.price - b.price);
    }

    displayProducts(sorted);
}); 