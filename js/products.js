async function loadProducts() {
  const response = await fetch("https://fakestoreapi.com/products");
  const products = await response.json();
  displayProducts(products);
}

function displayProducts(products) {
  const container = document.querySelector("#all-products .container");

  products.forEach((product) => {
    const productElement = document.createElement("div");
    productElement.classList.add("product");

    const pictureDiv = document.createElement("div");
    pictureDiv.classList.add("product-picture");

    const picture = document.createElement("picture");

    const img = document.createElement("img");
    const optimizedImageUrl = new URL(product.image);
    optimizedImageUrl.searchParams.set("size", "250");

    img.src = optimizedImageUrl.toString();
    img.alt = `product: ${product.title}`;
    img.width = 250;
    img.height = 250;
    img.loading = "lazy";
    img.decoding = "async";

    img.onerror = () => {
      img.style.backgroundColor = "#f0f0f0";
      img.classList.add("error");
    };

    img.onload = () => {
      img.classList.add("loaded");
    };

    picture.appendChild(img);
    pictureDiv.appendChild(picture);

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
