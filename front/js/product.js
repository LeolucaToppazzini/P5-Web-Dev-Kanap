// The septUrl variable retrieves the URL of the page
let septUrl = new URLSearchParams(document.location.search);

console.log(document.location);
// The productId variable will obtain the value of the _id parameter
let productId = septUrl.get("_id");
console.log(productId);

// Retrieval of API products and data processing

fetch("http://localhost:3000/api/products/" + productId)
  .then((data) => data.json())
  .then((products) => {
    allProducts(products);
  });

//The allProducts() function is used to display the product data on the page,
//including the product image, title, price, description, and color options.

function allProducts(product) {
  // Declaration of variables pointing to elements
  let image = document.querySelector("article div.item__img");
  let title = document.querySelector("#title");
  let price = document.querySelector("#price");
  let description = document.querySelector("#description");
  let colorSelection = document.querySelector("#colors");

  // Adding elements dynamically
  image.innerHTML = `<img src="${product.imageUrl}" alt="${product.altTxt}">`;
  title.textContent = `${product.name}`;
  price.textContent = `${product.price}`;
  description.textContent = `${product.description}`;

  // For loop for color selection

  for (let color of product.colors) {
    colorSelection.innerHTML += `<option value="${color}">${color}</option>`;
  }
}

// Retrieving the element to detect the click
const buttonAddToCart = document.getElementById("addToCart");

// Add an event listener for the click on the Add to Cart button
buttonAddToCart.addEventListener("click", function (event) {
  console.log(event);

  // Retrieving input colors
  const colorSelect = document.getElementById("colors");

  // Retrieving the color chosen by the user in the color option
  let colorValue = colorSelect.value;

  // Retrieving the input quantity
  const quantitySelect = document.getElementById("quantity");

  // Retrieving the quantity chosen by the user
  let quantityValue = quantitySelect.value;

  // Creating an object that retrieves the parameters to send them to localStorage
  let obj = {
    id: productId,
    color: colorValue,
    number: quantityValue,
  };
  let newObj = [obj];
  console.log(newObj);
  //The saveCart() function saves the shopping cart object to local storage.
  function saveCart(cart) {
    saveObject(cart, "cart");
  }

  //The saveObject() function saves any object to local storage using JSON serialization.
  function saveObject(value, key = "genericOBJ") {
    // Save a value associated with a key in localStorage
    // JSON serialization: transform a complex object into a string
    // JSON.stringify takes an object and turns it into a string
    localStorage.setItem(key, JSON.stringify(value));
  }
  //The getCart() function retrieves the shopping cart object from local storage.
  function getCart() {
    return getObject("cart");
  }

  //The getObject() function retrieves any object from local storage using JSON deserialization.
  // Retrieve the element with the registered key: obj
  function getObject(key = "genericOBJ") {
    // Save in a cart variable what we have retrieved
    let value = localStorage.getItem(key);
    return value == null ? [] : JSON.parse(value);
  }
  //The addToCart() function adds the selected product to the shopping cart object in local storage.
  //It performs validation checks on the quantity and color inputs before updating the cart object.
  //It then saves the updated cart object to local storage and displays an alert to confirm that the product has been added to the cart.
  function addToCart(obj) {
    if (obj.number < 1) {
      alert("la quantità deve essere di almeno un' unità");
      return;
    }
    if (obj.color === undefined || obj.color === null || obj.color === "") {
      alert("Scegliere un colore per l'oggetto");
      return;
    }
    let cart = getCart(); // Retrieve the object from localStorage
    // Search in the array if there is a product whose Id is equal to the Id of the object we want to add
    let searchId = cart.find(
      (element) => element.id == obj.id && element.color == obj.color
    );
    if (searchId !== undefined) {
      // found: if different from undefined, already exists in the array
      searchId.number =
        parseInt(searchId.number) + //Old item number cart
        parseInt(obj.number); //item added number of elements
    } else {
      // otherwise

      cart.push(obj); //pushing the project into the array
    }
    saveCart(cart);
    alert("Added to cart");
  }

  addToCart(obj);
});
