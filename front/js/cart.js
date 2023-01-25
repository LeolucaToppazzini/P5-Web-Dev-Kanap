
fetch("http://localhost:3000/api/products/" )
.then((data) => data.json())
.then((products) => {
  cartProducts(products);
});

function cartProducts(array_of_product_objects) {
  var cartObj = JSON.parse(localStorage.getItem("obj"));

  // itero sugli elementi dell'array "cartobj" che viene dal local storage (mio carrello)
  for (let j = 0; j < cartObj.length; j++){
    var cartProduct = cartObj[j]; // per comodità mi assegno l'elemento j dell'insieme a una variabile (quindi il singolo prodotto)
    // per ognuno di questi, vado a iterare sugli elementi del database e vedo se l'id corrisponde
    for (let i = 0; i < array_of_product_objects.length; i++){ //itero
      storeProduct = array_of_product_objects[i];// come prima per comodità gli do un nome
      if ( cartProduct['id'] === storeProduct['_id']){// se gli id corrispondono... (occhio ai TRATTINI)
        // assegno tutte le altre cose a cartProduct (il prod in local storage), prendendole da quello del DB
           cartProduct['name'] = storeProduct['name'];
           cartProduct['price'] = storeProduct['price'];
           cartProduct['image'] = storeProduct['imageUrl'];
           cartProduct['description'] = storeProduct['description'];
           cartProduct['alt'] = storeProduct['altTxt'];
           // infine, col mio cartProduct bello riempito di dati, lo do in pasto alla funzione che genera l'html
          cartDisplayed(cartProduct);
      }
  }
}
}

function cartDisplayed(elementSelected) {

  let visualizedCart = document.querySelector("#cart__items"); //piglio l' elemento carrello dove deve stare
  let   product = elementSelected; // un nome per comodità
  /* aggiungo all html il codice relativo alla singola box prodotto */
  visualizedCart.innerHTML +=  `<article class="cart__item" data-id="${product.id}" data-color="${product.color}">
 <div class="cart__item__img">
 <img src="${product['image']}" alt="${product['alt']}">
 </div>
 <div class="cart__item__content">
   <div class="cart__item__content__description">
     <h2>${product['name']}</h2>
     <p>${product['color']}</p>
     <p>Price: ${product.price}</p>
     <p> ${product['price']}</p>

   </div>
   <div class="cart__item__content__settings">
     <div class="cart__item__content__settings__quantity">
       <p>Quantity : </p>
       <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${product.number}">
     </div>
     <div class="cart__item__content__settings__delete">
       <p class="deleteItem">Delete</p>
     </div>
   </div>
 </div>
</article> `
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
