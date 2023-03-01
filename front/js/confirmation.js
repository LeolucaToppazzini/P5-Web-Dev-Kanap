const url_string = window.location.href; 
const url = new URL(url_string);
document.getElementById("orderId").innerHTML = url.searchParams.get("id");
localStorage.clear();