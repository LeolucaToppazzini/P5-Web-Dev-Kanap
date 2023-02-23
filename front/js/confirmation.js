const url_string = window.location.href; // www.test.com?filename=test
const url = new URL(url_string);
document.getElementById("orderId").innerHTML = url.searchParams.get("id");
