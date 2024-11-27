async function loadProducts() {
  const response = await fetch("https://fakestoreapi.com/products");
  const products = await response.json();

  // 첫 번째 제품 이미지 미리 로드
  const preloadLink = document.createElement("link");
  preloadLink.rel = "preload";
  preloadLink.as = "image";
  preloadLink.href = products[0].image;
  document.head.appendChild(preloadLink);

  displayProducts(products);
}

function displayProducts(products) {
  const container = document.querySelector("#all-products .container");

  products.forEach((product, index) => {
    const productElement = document.createElement("div");
    productElement.classList.add("product");

    const pictureDiv = document.createElement("div");
    pictureDiv.classList.add("product-picture");

    const img = document.createElement("img");

    // 첫 번째 이미지만 즉시 로드, 나머지는 지연 로드
    if (index === 0) {
      img.src = product.image;
      img.fetchPriority = "high";
    } else {
      img.loading = "lazy";
      img.src =
        'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 250 250"%3E%3Crect width="250" height="250" fill="%23f0f0f0"/%3E%3C/svg%3E';
      img.dataset.src = product.image;
    }

    img.alt = `product: ${product.title}`;
    img.width = 250;

    pictureDiv.appendChild(img);

    // 첫 번째 이미지가 아닌 경우에만 Intersection Observer 적용
    if (index !== 0) {
      imageObserver.observe(img);
    }

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

    infoDiv.appendChild(category);
    infoDiv.appendChild(title);
    infoDiv.appendChild(price);
    infoDiv.appendChild(button);

    productElement.appendChild(pictureDiv);
    productElement.appendChild(infoDiv);

    container.appendChild(productElement);
  });
}

loadProducts();

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

processChunk(0, 1000);
