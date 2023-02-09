let totalPrice = 0;

function fetchIt() {
  fetch("http://localhost:3000/api/products/" )
    .then((data) => data.json())
    .then((products) => {
      cartProducts(products);
    });
}

function updateCart() {
  
 
  document.getElementById("totalPrice").innerHTML = totalPrice;
  //deleteItem();
  deleteArticle();
  quantityModifier();
  checkSubmit();

}


function cartProducts(array_of_product_objects) {
  var cartObj = JSON.parse(localStorage.getItem("cart"));
  totalPrice = 0;

  // itero sugli elementi dell'array "cartobj" che viene dal local storage (mio carrello)
  if (cartObj !== undefined) {
    for (let j = 0; j < cartObj.length; j++){
      var cartProduct = cartObj[j]; // per comodità mi assegno l'elemento j dell'insieme a una variabile (quindi il singolo prodotto)
      // per ognuno di questi, vado a iterare sugli elementi del database e vedo se l'id corrisponde
      for (let i = 0; i < array_of_product_objects.length; i++){ //itero
        dbProduct = array_of_product_objects[i];// come prima per comodità gli do un nome
        if ( cartProduct['id'] === dbProduct['_id']){// se gli id corrispondono... (occhio ai TRATTINI)
          // assegno tutte le altre cose a cartProduct (il prod in local storage), prendendole da quello del DB
            cartProduct['name'] = dbProduct['name'];
            cartProduct['price'] = dbProduct['price'];
            cartProduct['image'] = dbProduct['imageUrl'];
            cartProduct['description'] = dbProduct['description'];
            cartProduct['alt'] = dbProduct['altTxt'];
            totalPrice += cartProduct.price * cartProduct.number;
            // infine, col mio cartProduct bello riempito di dati, lo do in pasto alla funzione che genera l'html
            cartDisplayed(cartProduct);
            break;
        }
      }
    }
  }
  
  
  
  
}

function cartDisplayed(elementSelected) {

  let visualizedCart = document.querySelector("#cart__items"); //piglio l' elemento carrello dove deve stare
  let   product = elementSelected; // un nome per comodità
  /* aggiungo all html il codice relativo alla singola box prodotto */
  visualizedCart.innerHTML +=  `<article id="art-${product.id}-${product.color}" class="cart__item" data-id="${product.id}" data-color="${product.color}">
 <div class="cart__item__img">
 <img src="${product['image']}" alt="${product['alt']}">
 </div>
 <div class="cart__item__content">
   <div class="cart__item__content__description">
     <h2>${product['name']}</h2>
     <p>${product['color']}</p>
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
</article> `
updateCart();

}


function quantityModifier() {
  const cart = document.querySelectorAll(".cart__item");
  console.log(cart);
  // modo per vedere cosa abbiamo visualizzato dinamicamente grazie al set di dati
   cart.forEach((cart) => {console.log("item dataset: " + " " + cart.dataset.id + " " + cart.dataset.color + " " + cart.dataset.number); }); 
  // Ascoltiamo ciò che accade in itemQuantity dell'elemento in questione
  cart.forEach((cart) => {
    cart.addEventListener("change", (eq) => {
      // verifica delle informazioni sul valore del click e del loro posizionamento negli articoli
      let cartMod = JSON.parse(localStorage.getItem("cart"));
      // ciclo per modificare la quantità del prodotto nel carrello con il nuovo valore
      for (article of cartMod){
       
      console.log(article.id);
      console.log(cart.dataset.id);
      console.log(article.color);
      console.log(cart.dataset.color);
      if (
          article.id === cart.dataset.id &&
          cart.dataset.color === article.color
        ) {
          article.number = eq.target.value;
          localStorage.cart = JSON.stringify(cartMod);
          // aggiornare il set di dati sulla quantità
          cart.dataset.number = eq.target.value;
          // eseguire la funzione per aggiornare i dati
          
          updateCart();
         
        }}
    });
  });
}

/*function deleteItem() {
 
  const cartItemDeleteButtons = document.querySelectorAll(".cart__item .deleteItem");
  

  
  cartItemDeleteButtons.forEach((cartItemDeleteButton) => {
    
    cartItemDeleteButton.addEventListener("click", () => {
      let cart = JSON.parse(localStorage.getItem("cart"));
      for (let i = 0; i < cart.length; i++) {
        let article = cart[i];
      //for (article of cart) {
       
        console.log(article.id);
        //console.log(cart.dataset.id);
        console.log(article.color);
        //console.log(cart.dataset.color);
        if (article.id === cartItemDeleteButton.dataset.id
                && cartItemDeleteButton.dataset.color === article.color) {
          //TODO:
          cart.splice(i, 1);
          localStorage.setItem(cart, "cart");
          break;


            //localStorage.cart = JSON.stringify(cartMod);
            
            
            
           
          }}
    });
  });
 // updateCart();
}*/

function deleteArticle(id, color) {
 
  //const cartItemDeleteButtons = document.querySelectorAll(".cart__item .deleteItem");
  

  
  //cartItemDeleteButtons.forEach((cartItemDeleteButton) => {
    
    //cartItemDeleteButton.addEventListener("click", () => {
      let cart = JSON.parse(localStorage.getItem("cart"));
      for (let i = 0; i < cart.length; i++) {
        let article = cart[i];
      //for (article of cart) {
       
        console.log(article.id);
        //console.log(cart.dataset.id);
        console.log(article.color);
        //console.log(cart.dataset.color);
        if (article.id === id
                && article.color === color) {
          //TODO:
          cart.splice(i, 1);
          //localStorage.removeItem("cart");
          localStorage.setItem("cart", JSON.stringify(cart));
          document.getElementById("art-" + id + "-" + color).remove();
          break;


            //localStorage.cart = JSON.stringify(cartMod);
            
            
            
           
        }
      }
 // updateCart();
}

/*
function cartProducts(index) {
    // il cestino convertito viene recuperato
    let allProducts = index;
  let cartNew = JSON.parse(localStorage.getItem("obj"));
  // se esiste un cestino con una dimensione diversa da 0 (quindi maggiore di 0)
   if (cartNew && cartNew.length != 0) {
  // zona di corrispondenza chiave/valore dell'api e del carrello grazie all'id del prodotto scelto nel localStorage
    for (let product of cartNew) {
      console.log(product);
      for (let g = 0, h = index.length; g < h; g++) {
        if (product._id === index[g].id) {
          // creazione e aggiunta dei valori del paniere che saranno utilizzati per i valori del set di dati
          //product._id = index[g].id
          product.name = index[g].name;
          product.price = index[g].price;
          product.image = index[g].imageUrl;
          product.description = index[g].description;
          product.alt = index[g].altTxt;
          //product.colors = index[g].color;

          cartDisplayed(product);


        }
      }
    }
    // se giochiamo a visualizzare, nel cestino vengono aggiunte chiavi/valori che non sono stati inseriti nella memoria locale e che sono reali
    // qui il cestino ha i valori della memoria locale + i valori definiti sopra
    //chiediamo ad affiche() di giocare con i dati del cestino 
    //i valori aggiunti al carrello hanno un ambito allargato, poiché sono richiamati tramite la funzione cartDisplayed() e in cartDisplayed() non c'è una chiamata al carrello dalla memoria locale.
    //cartDisplayed(cartNew);
  } else {
    // se non c'è un carrello della spesa, creiamo un H1 informativo e una quantità appropriata
    document.querySelector("#totalQuantity").innerHTML = "0";
    document.querySelector("#totalPrice").innerHTML = "0";
    document.querySelector("h1").innerHTML =
      "You have no items in your cart";
  }
 
}
//--------------------------------------------------------------
//Funzione di visualizzazione di un cestino (tabella)
//--------------------------------------------------------------
*/



 
  // dichiarare e puntare all'area di visualizzazione
  // abbiamo creato le visualizzazioni dei prodotti del paniere tramite una mappa e l'introduzione del dataset nel codice
  /*
 //sostituire le virgole che uniscono gli oggetti nell'array con uno spazio vuoto
  // ascoltare le variazioni della quantità per visualizzare e aggiornare i dati
*/


function checkSubmit() {
  // Prendere il form tramite la sua classe
  const form = document.querySelector('.cart__order__form');

  // Impostare l'evento di invio sul form
  form.addEventListener('submit', (e) => {
    // Prevenire l'invio del form
    e.preventDefault();

    let firstName = document.querySelector("#firstName").value;
    let lastName = document.querySelector("#lastName").value;
    let address = document.querySelector("#address").value;
    let city = document.querySelector("#city").value;
    let email = document.querySelector("#email").value;
  
    // Inizializzare variabili booleane per verificare la validità dei dati
    let firstNameValid = false;
    let lastNameValid = false;
    let addressValid = false;
    let cityValid = false;
    let emailValid = false;
  
    // Verificare che i campi obbligatori non siano vuoti
    if (firstName) {
      firstNameValid = true;
    } else {
      document.querySelector("#firstNameErrorMsg").innerHTML = "Il nome è richiesto";
    }
    if (lastName) {
      lastNameValid = true;
    } else {
      document.querySelector("#lastNameErrorMsg").innerHTML = "Il cognome è richiesto";
    }
    if (address) {
      addressValid = true;
    } else {
      document.querySelector("#addressErrorMsg").innerHTML = "L'indirizzo è richiesto";
    }
    if (city) {
      cityValid = true;
    } else {
      document.querySelector("#cityErrorMsg").innerHTML = "La città è richiesta";
    }
  
    // Verificare che l'email sia valida
    let emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (email.match(emailRegex)) {
      emailValid = true;
    } else {
      document.querySelector("#emailErrorMsg").innerHTML = "Inserisci un'email valida";
    }
  
    // Se tutti i dati sono validi, creare un oggetto di contatto
    if (firstNameValid && lastNameValid && addressValid && cityValid && emailValid) {
      let contact = {
        firstName: firstName,
        lastName: lastName,
        address: address,
        city: city,
        email: email
      };

      console.log(contact);
    
  
      // Creare una tabella prodotto
      let productTable = "";

      console.log(productTable);
  
      // Inviare i dati al endpoint ordine
      // ...
      // Ottenere l'ID ordine
      // ...
    }
  

    // Log del contatto e della tabella di prodotto per verificare che siano stati creati correttamente
    
  });
}

