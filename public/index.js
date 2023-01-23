let containerDiv = document.getElementById('product-contain')
const getData = async () => {
    let data = await fetch('/get_products');
    data.json().then((parsed) => {
    parsed.forEach((object) => {
        //create an element for each product
        let containerElement = document.createElement('div');
        containerElement.id = object._id
        containerElement.className = "item"
        let h1Tag = document.createElement('h1');
        h1Tag.textContent = `${object.name.toUpperCase()}`;
        containerElement.appendChild(h1Tag);
        let imgTag = document.createElement('img')
        imgTag.src = object.imgLink
        containerElement.appendChild(imgTag)
        let h2Tag = document.createElement('h2');
        h2Tag.textContent = `PRICE: $${object.price}`;
        containerElement.appendChild(h2Tag);
        containerDiv.appendChild(containerElement)
        //to let each item be clickable to its own display page
            let productsArray = document.querySelectorAll('.item')
            console.log(productsArray)
            productsArray.forEach(el => {
            el.addEventListener('click', () => {
            console.log(el.id)
            window.location.href = `./show_product?id=${el.id}`
        })
        })
    })})
}
getData()

let addButton = document.getElementById('add-product')
addButton.addEventListener('click', () => {
    window.location.href = "./add_product"
})