function updateSlidePosition(slides, current, bullets) {
    slides.style.transform = `translateX(-${current * 100}vw)`;
    bullets.forEach(b => b.classList.remove('active'));
    bullets[current].classList.add('active');

    document.querySelectorAll('.slide').forEach((slide, index) => {
        slide.classList.toggle('active', index === current);
    });
}

function main() {
   const slides = document.getElementById('slides');
   const totalSlides = document.querySelectorAll('.slide').length;
   const bulletContainer = document.getElementById('bullets');

   const codeSnippets = [
    `const allProducts = fetchData('/api/products');

async function productListFetching(allProducts) {
  let products = await allProducts;
  for (const product of products){
    createProductCard(product);
  }
}`,
    
    `async function addToCart(productId) {
  const products = await fetchData('/api/products');
  const product = products.find(p => p.id === productId);

  fetch("/api/cart", {
    method: "POST",
    body: JSON.stringify({
      id: product.id,
      quantity: 1
    }),
    headers: {
      "Content-type": "application/json"
    }
  });
}`,
    
    `async function fetchCart() {
  const cart = await fetchData('/api/checkout');
  console.log('Fetched cart:', cart);
  return cart;
}`
    
    ];

   let current = 0;
   const bullets = [];

   document.querySelectorAll('.interactive-list li').forEach(item => {
    item.addEventListener('click', () => {
      const id = item.getAttribute('data-code-id');
      const codeDisplay = document.getElementById('codeDisplay');
      codeDisplay.textContent = codeSnippets[id];
    });
    });

   for (let i = 0; i < totalSlides; i++) {
    const b = document.createElement('div');
    b.classList.add('bullet');
    bulletContainer.appendChild(b);

    b.addEventListener('click', () => {
        current = i;
        updateSlidePosition(slides, current, bullets);
    });

    bullets.push(b);
   }

   document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowRight' && current < totalSlides - 1) {
        current++;
        updateSlidePosition(slides, current, bullets);
    } else if (e.key === 'ArrowLeft' && current > 0) {
        current--;
    } else {
        return;
    }
    updateSlidePosition(slides, current, bullets);
   });

   setTimeout(() => {
        updateSlidePosition(slides, current, bullets);
    }, 100);
}

window.addEventListener('load', main);