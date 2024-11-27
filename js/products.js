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
        updateSourcesAndImage(img);
        img.classList.add("loaded");
        observer.unobserve(img);
      }
    });
  });

  const container = document.querySelector("#all-products .container");

  products.forEach((product) => {
    const productElement = document.createElement("div");
    productElement.classList.add("product");

    const pictureDiv = document.createElement("div");
    pictureDiv.classList.add("product-picture");

    const picture = document.createElement("picture");

    const avifSource = document.createElement("source");
    avifSource.type = "image/avif";
    avifSource.dataset.srcset = product.image.replace(
      /\.(jpg|jpeg|png)$/i,
      ".avif"
    );

    const webpSource = document.createElement("source");
    webpSource.type = "image/webp";
    webpSource.dataset.srcset = product.image.replace(
      /\.(jpg|jpeg|png)$/i,
      ".webp"
    );

    const img = document.createElement("img");
    img.classList.add("lazy");
    img.src =
      'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 250 250"%3E%3Crect width="250" height="250" fill="%23f0f0f0"/%3E%3C/svg%3E';
    img.style.backgroundColor = "#f0f0f0";
    img.dataset.src = product.image;
    img.alt = `product: ${product.title}`;
    img.width = 250;
    img.loading = "lazy";

    picture.appendChild(avifSource);
    picture.appendChild(webpSource);
    picture.appendChild(img);

    pictureDiv.appendChild(picture);

    imageObserver.observe(img);
    const updateSourcesAndImage = (img) => {
      const picture = img.closest("picture");
      if (picture) {
        const sources = picture.querySelectorAll("source");
        sources.forEach((source) => {
          source.srcset = source.dataset.srcset;
        });
      }
      img.src = img.dataset.src;
    };

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
