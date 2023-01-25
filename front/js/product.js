//la variabile septUrl recupera l'url della pagina
let septUrl = new URLSearchParams(document.location.search);

console.log(document.location);
// la variabile id otterrà il valore del parametro _id
let productId = septUrl.get("_id");
console.log(productId);

// Recupero dei prodotti api ed elaborazione dei dati (vedi script.js)

fetch("http://localhost:3000/api/products/" + productId)
  .then((data) => data.json())
  .then((products) => {
    allProducts(products);
  });

// funzione di visualizzazione dei prodotti

function allProducts(product) {
  // dichiarazione delle variabili che puntano agli elementi
  let image = document.querySelector("article div.item__img");
  let title = document.querySelector("#title");
  let price = document.querySelector("#price");
  let description = document.querySelector("#description");
  let colorSelection = document.querySelector("#colors");

  //aggiungere elementi dinamicamente
  image.innerHTML = `<img src="${product.imageUrl}" alt="${product.altTxt}">`;
  title.textContent = `${product.name}`;
  price.textContent = `${product.price}`;
  description.textContent = `${product.description}`;

  //ciclo for per la selezione dei colori

  for (let color of product.colors) {
    colorSelection.innerHTML += `<option value="${color}">${color}</option>`;
  }
}

//Recuperare l'elemento su cui si vuole rilevare il clic
const buttonAddToCart = document.getElementById("addToCart");

//Aggiungi un ascoltatore di eventi per il clic sul pulsante Aggiungi al carrello
buttonAddToCart.addEventListener("click", function (event) {
  //https://www.w3schools.com/js/js_htmldom_eventlistener.asp
  console.log(event);

  //Recupero dei colori di input
  const colorSelect = document.getElementById("colors");

  //Recuperare il colore scelto dall'utente nell'opzione colori
  let colorValue = colorSelect.value;

  //Recupero della quantità in ingresso
  const quantitySelect = document.getElementById("quantity");

  // Recupero della quantità scelta dall'utente
  let quantityValue = quantitySelect.value;

  //Creazione di un oggetto che recupera i parametri per inviarli al localStorage
  let obj = {
    id: productId,
    color: colorValue,
    number: quantityValue,

     


  };
  let newObj = [obj];
  console.log(newObj);

  //registrazione del nuovo cestino nel localStorage.
  function saveObject(cart) {
    //Salviamo nel localStorage un valore associato a una chiave.
    //serializzazione JSON : trasformiamo un oggetto complesso in una stringa
    //JSON.stringify prende un oggetto e lo trasforma in una stringa
    localStorage.setItem("obj", JSON.stringify(cart));
  }

  //recuperare l'oggetto localStorage usando getItem per aggiungere un nuovo oggetto
  //recuperare l'elemento con la chiave registrata: obj
  function getCart() {
    //registriamo in una variabile del carrello ciò che abbiamo recuperato
    let cart = localStorage.getItem("obj");
    return cart == null ? [] : JSON.parse(cart);
  }

  function addToCart(obj) {
    let cart = getCart(); //prelevare l'oggetto dal localStorage
    //cerca nell'array se esiste un prodotto il cui Id è uguale all'Id dell'oggetto che vogliamo aggiungere
    let searchId = cart.find(
      (element) => element.id == obj.id && element.color == obj.color
    );
    if (searchId != undefined) {
      // trovato: se diverso da undefined, esiste già nell'array
      searchId.number = parseInt(searchId.number) + parseInt(obj.number);
    } else {
      // altrimenti
      obj.number = quantityValue;
      cart.push(obj); //spingere il progetto nell'array
    }
    saveObject(cart);
    alert("Added to cart");
  }

  addToCart(obj);
});
