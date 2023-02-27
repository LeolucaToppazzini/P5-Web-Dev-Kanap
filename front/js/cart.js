let totalPrice = 0;
let array_of_product_objects = [];

// fetchIt(): This function sends a GET request to the specified URL, retrieves the response,
//and converts the response data to a JSON format.
//Then it assigns the received data to the array_of_product_objects variable and calls the cartProducts() function.
function fetchIt() {
  fetch("http://localhost:3000/api/products/")
    .then((data) => data.json())
    .then((products) => {
      array_of_product_objects = products;
      cartProducts();
    });
}
// updatePrice(): This function updates the value of the totalPrice variable and
//then updates the HTML element with the id totalPrice to display the updated value.
function updatePrice() {
  cartProducts(false);
  document.getElementById("totalPrice").innerHTML = totalPrice;
}
//initCartFunctions(): This function initializes various cart-related functions,
//including the quantityModifier() and checkSubmit() functions,
// and then updates the cart price using the updatePrice() function.
function initCartFunctions() {
  quantityModifier();
  checkSubmit();
  updatePrice();
}
//cartProducts(): This function retrieves the cart data from the local storage and then iterates over each item in the cart.
//For each item, it searches for a matching product in the array_of_product_objects variable and
// updates the item information using the product information.
//Finally, it calls the cartDisplayed() function to display the cart item on the web page.
function cartProducts(display = true) {
  var cartObj = JSON.parse(localStorage.getItem("cart"));
  totalPrice = 0;

  // Iterates over the items in the "cartObj" array that comes from local storage (my cart)
  if (cartObj !== undefined) {
    for (let j = 0; j < cartObj.length; j++) {
      var cartProduct = cartObj[j]; // Assigns the jth element of the set to a variable (so the single product)
      // For each of these, I iterate over the elements of the database and see if the id matches
      for (let i = 0; i < array_of_product_objects.length; i++) {
        //itero
        dbProduct = array_of_product_objects[i]; //as before, for convenience I give it a name
        if (cartProduct["id"] === dbProduct["_id"]) {
          // if the IDs match
          // Assign all other cartProduct attributes from the DB
          cartProduct["name"] = dbProduct["name"];
          cartProduct["price"] = dbProduct["price"];
          cartProduct["image"] = dbProduct["imageUrl"];
          cartProduct["description"] = dbProduct["description"];
          cartProduct["alt"] = dbProduct["altTxt"];
          totalPrice += cartProduct.price * cartProduct.number;
          // Finally, with the cartProduct full of data, I feed it to the function that generates the HTML

          if (display) {
            cartDisplayed(cartProduct);
          }
          break;
        }
      }
    }
  }
}
//cartDisplayed(elementSelected): This function creates the HTML content for a single cart item
// based on the provided elementSelected object and then appends it to the cart display area on the web page.
function cartDisplayed(elementSelected) {
  let visualizedCart = document.querySelector("#cart__items"); //gets the cart element where the item should be
  let product = elementSelected;
  // Adds to the HTML the code related to the single product box
  visualizedCart.innerHTML += `<article id="art-${product.id}-${product.color}" class="cart__item" data-id="${product.id}" data-color="${product.color}">
 <div class="cart__item__img">
 <img src="${product["image"]}" alt="${product["alt"]}">
 </div>
 <div class="cart__item__content">
   <div class="cart__item__content__description">
     <h2>${product["name"]}</h2>
     <p>${product["color"]}</p>
     <p>Price: ${product.price}</p>

   </div>
   <div class="cart__item__content__settings">
     <div class="cart__item__content__settings__quantity">
       <p>Quantity : </p>
       <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${product.number}">
     </div>
     <div class="cart__item__content__settings__delete">
     <p class="deleteItem" data-id="${product.id}" data-color="${product.color}" onClick="deleteArticle('${product.id}', '${product.color}')">Delete</p>
     </div>
   </div>
 </div>
</article> `;
  initCartFunctions();
}
//quantityModifier(): This function adds an event listener to each item in the cart to detect changes to the item quantity.
//When the quantity changes, it updates the corresponding item in the local storage with the new quantity value.
function quantityModifier() {
  const cartHTML = document.querySelectorAll(".cart__item");
  console.log(cartHTML);
  // way to see what we have dynamically displayed thanks to the dataset
  cartHTML.forEach((cartItem) => {
    console.log(
      "item dataset: " +
        " " +
        cartItem.dataset.id +
        " " +
        cartItem.dataset.color
    );
  });
  // Listen to what happens in itemQuantity of the element in question
  cartHTML.forEach((cartItem) => {
    cartItem.addEventListener("change", (eq) => {
      // verify information about the click value and their placement in the items
      let cartLS = JSON.parse(localStorage.getItem("cart"));
      // loop to modify the quantity of the product in the cart with the new value
      for (article of cartLS) {
        console.log(article.id);
        console.log(cartItem.dataset.id);
        console.log(article.color);
        console.log(cartItem.dataset.color);
        if (
          article.id === cartItem.dataset.id &&
          article.color === cartItem.dataset.color
        ) {
          article.number = eq.target.value;
          localStorage.cart = JSON.stringify(cartLS);

          // execute the function to update data
          initCartFunctions();
        }
      }
    });
  });
}

//eleteArticle(id, color): This function is called when a user wants to delete an article from the shopping cart.
// It takes two parameters: the ID and color of the article to be deleted.
function deleteArticle(id, color) {
  let cart = JSON.parse(localStorage.getItem("cart"));
  for (let i = 0; i < cart.length; i++) {
    let article = cart[i];
    //for (article of cart) {

    console.log(article.id);
    //console.log(cart.dataset.id);
    console.log(article.color);
    //console.log(cart.dataset.color);
    if (article.id === id && article.color === color) {
      cart.splice(i, 1);

      localStorage.setItem("cart", JSON.stringify(cart));
      document.getElementById("art-" + id + "-" + color).remove();
      updatePrice();
      break;

      //localStorage.cart = JSON.stringify(cartMod);
    }
  }
  initCartFunctions();
}

//checkSubmit(): This function is called when the user clicks on the "Submit Order" button in the shopping cart.
// It takes no parameters. It retrieves the user's input data from the form, validates the required fields,
// and checks the validity of the email address. If all the data is valid,
// it creates an object with the user's contact information and the list of product IDs in the cart.
//Then it sends the data to the server via a POST request to the endpoint "/api/products/order".
function checkSubmit() {
  // Get the form by its class
  const form = document.querySelector(".cart__order__form");

  // Set the submit event on the form
  form.addEventListener("submit", (e) => {
    // Prevent form submission
    e.preventDefault();

    let firstName = document.querySelector("#firstName").value;
    let lastName = document.querySelector("#lastName").value;
    let address = document.querySelector("#address").value;
    let city = document.querySelector("#city").value;
    let email = document.querySelector("#email").value;

    // Initialize boolean variables to check data validity
    let firstNameValid = false;
    let lastNameValid = false;
    let addressValid = false;
    let cityValid = false;
    let emailValid = false;

    // Check that required fields are not empty
    if (firstName) {
      if (/^[a-zA-Z]+$/.test(firstName)) {
        firstNameValid = true;
      } else {
        document.querySelector("#firstNameErrorMsg").innerHTML =
          "Il nome deve contenere solo lettere";
      }
    } else {
      document.querySelector("#firstNameErrorMsg").innerHTML =
        "Il nome è richiesto";
    }
    if (lastName) {
      if (/^[a-zA-Z]+$/.test(lastName)) {
        lastNameValid = true;
      } else {
        document.querySelector("#lastNameErrorMsg").innerHTML =
          "Il cognome deve contenere solo lettere";
      }
    } else {
      document.querySelector("#lastNameErrorMsg").innerHTML =
        "Il cognome è richiesto";
    }
    
    if (address) {
      addressValid = true;
    } else {
      document.querySelector("#addressErrorMsg").innerHTML =
        "L'indirizzo è richiesto";
    }
    if (city) {
      cityValid = true;
    } else {
      document.querySelector("#cityErrorMsg").innerHTML =
        "La città è richiesta";
    }

    // Check that the email is valid
    let emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (email.match(emailRegex)) {
      emailValid = true;
    } else {
      document.querySelector("#emailErrorMsg").innerHTML =
        "Inserisci un'email valida";
    }

    // If all data is valid, create a contact object
    if (
      firstNameValid &&
      lastNameValid &&
      addressValid &&
      cityValid &&
      emailValid
    ) {
      let contact = {
        firstName: firstName,
        lastName: lastName,
        address: address,
        city: city,
        email: email,
      };

      console.log(contact);

      let newCartId = [];

      let newCart = JSON.parse(localStorage.getItem("cart"));

      for (let indice of newCart) {
        newCartId.push(indice.id);
      }
      console.log(newCartId);

      let finalObject;

      finalObject = {
        contact: contact,
        products: newCartId,
      };

      console.log(finalObject);

      // Send data to order endpoint
      // ...
      // Get order ID
      // ...

      fetch("http://localhost:3000/api/products/order", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(finalObject),
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          document.location.href = "confirmation.html?id=" + data.orderId;
        });
    }
  });
}
