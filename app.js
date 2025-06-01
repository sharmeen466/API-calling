const container = document.getElementById("container")
let productData = []

fetch("https://dummyjson.com/products").then(function (res) {
    return res.json()
}).then(function (data) {
    // console.log("api data",data);
    productData = data.products
})
console.log(productData);
setTimeout(function () {
    for (let i = 0; i < productData.length; i++) {
        let product = productData[i]

        container.innerHTML += `
    <div id = "boxes">
        <img src = "${product.images[0]}" width = "200px">
        
        <p style= "font-size: 1.2rem; font-weight: bold">${product.title}</p>
        <p>category: ${product.category}</p>
        <p>Brand: ${product.brand}</p>        
        <p>Warranty: ${product.warrantyInformation}</p>
        <p>Price: $${product.price}</p>
        <p class= "stock">stock: ${product.stock}</p>
        <p>${product.returnPolicy}</p>
        <button class= "btn">Buy Now</button>
    </div>`

        const btn = document.getElementsByClassName("btn")
        for (let i = 0; i < btn.length; i++) {
            btn[i].addEventListener("click", function () {

                if (productData[i].stock > 0) {
                    let availableStock = --productData[i].stock
                    let boxDiv = this.closest("#boxes")
                    let stockPara = boxDiv.querySelector(".stock")
                    console.log(stockPara);
                    stockPara.innerHTML = `<p class= "stock">stock: ${availableStock}</p>`

                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        background: '#282928',
                        color: 'white',
                        title: "Your Order has been Done",
                        showConfirmButton: false,
                        timer: 1500
                    });
                }
                else {
                    Swal.fire({
                        icon: 'error',
                        title: 'Out of Stock',
                        text: 'Sorry, this product is out of stock!',
                        background: '#282928',
                        color: 'white',
                    });
                }
            })
        }
    }
}, 1000)

