async function loadProducts() {
  const response = await fetch("https://fakestoreapi.com/products");
  const products = await response.json();
  displayProducts(products);
}

function displayProducts(products) {
  const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = img.dataset.src;
        img.classList.add("loaded");
        observer.unobserve(img);
      }
    });
  });

  // Find the container where products will be displayed
  const container = document.querySelector("#all-products .container");

  // Iterate over each product and create the HTML structure safely
  products.forEach((product) => {
    // Create the main product div
    const productElement = document.createElement("div");
    productElement.classList.add("product");

    // Create the product picture div
    const pictureDiv = document.createElement("div");
    pictureDiv.classList.add("product-picture");

    const img = document.createElement("img");
    img.classList.add("lazy");
    // 1. Base64 블러 플레이스홀더 사용
    img.src =
      'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 250 250"%3E%3Crect width="250" height="250" fill="%23f0f0f0"/%3E%3C/svg%3E';
    // 또는
    // 2. CSS background로 대체
    img.style.backgroundColor = "#f0f0f0";

    img.dataset.src = product.image; // 실제 이미지 URL
    img.alt = `product: ${product.title}`;
    img.width = 250;
    img.loading = "lazy";

    pictureDiv.appendChild(img);
    imageObserver.observe(img);

    // Create the product info div
    const infoDiv = document.createElement("div");
    infoDiv.classList.add("product-info");

    const category = document.createElement("h5");
    category.classList.add("categories");
    category.textContent = product.category;

    const title = document.createElement("h4");
    title.classList.add("title");
    title.textContent = product.title;

    const price = document.createElement("h3");
    price.classList.add("price");
    const priceSpan = document.createElement("span");
    priceSpan.textContent = `US$ ${product.price}`;
    price.appendChild(priceSpan);

    const button = document.createElement("button");
    button.textContent = "Add to bag";

    // Append elements to the product info div
    infoDiv.appendChild(category);
    infoDiv.appendChild(title);
    infoDiv.appendChild(price);
    infoDiv.appendChild(button);

    // Append picture and info divs to the main product element
    productElement.appendChild(pictureDiv);
    productElement.appendChild(infoDiv);

    // Append the new product element to the container
    container.appendChild(productElement);
  });
}

loadProducts();

// 청크 단위로 무거운 연산 처리
function processChunk(start, end) {
  for (let i = start; i < end; i++) {
    const temp = Math.sqrt(i) * Math.sqrt(i);
  }

  if (end < 10000000) {
    setTimeout(() => {
      processChunk(end, Math.min(end + 1000, 10000000));
    }, 0);
  }
}

// 1000개 단위로 처리 시작
processChunk(0, 1000);
