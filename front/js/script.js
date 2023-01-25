fetch("http://localhost:3000/api/products")
  .then((data) => {
    return data.json();
  })

  .then((articles) => {
    insertArticles(articles);
  });
const articleHolder = document.getElementById("items");

function insertArticles(articles) {
  for (let i = 0; i < articles.length; i++) {
    const article = articles[i];
    console.log(article);
    const articleElement = document.createElement("div");
    //articleElement.setAttribute.apply(article._id);
    articleElement.classList.add("items");
    articleElement.innerHTML = `<a href="./product.html?_id=${article._id}">
    <article>
      <img src="${article.imageUrl}" alt="${article.altTxt}">
      <h3 >${article.name}</h3>
      <p >${article.description}</p>
    </article>
  </a>`;
    articleHolder.appendChild(articleElement);
    console.log("adding element", articleElement);
  }
}
