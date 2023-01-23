let containerDiv = document.getElementById('product-contain')
const urlSearchParams = new URLSearchParams(window.location.search);
const params = Object.fromEntries(urlSearchParams.entries());
console.log(params)
const getData = async () => {
    let data = await fetch(`/get_specific_product/${params.id}`);
    data.json().then((parsed) => {
    parsed.forEach((object) => {
        let containerElement = document.createElement('div');
        containerElement.id = object._id
        containerElement.className = "item"
        let h1Tag = document.createElement('h1');
        h1Tag.textContent = `${object.name.toUpperCase()}`;
        containerElement.appendChild(h1Tag);
        let imgTag = document.createElement('img')
        imgTag.src = object.imgLink
        containerElement.appendChild(imgTag)
        let pTag = document.createElement('p');
        pTag.textContent = `${object.desc}`;
        containerElement.appendChild(pTag);
        let h2Tag = document.createElement('h2');
        h2Tag.textContent = `PRICE: $${object.price}`;
        containerElement.appendChild(h2Tag);
        let h3Tag = document.createElement('h3');
        h3Tag.textContent = `${object.inventory} Remaining`;
        containerElement.appendChild(h3Tag)
        let buyButton = document.createElement('button')
        buyButton.textContent = `BUY NOW`
        if (object.inventory <= 0){
            buyButton.className = 'disabled'
        }
        containerElement.appendChild(buyButton)
        containerDiv.appendChild(containerElement)

    })});
}
getData()

let addButton = document.getElementById('all-products')
addButton.addEventListener('click', () => {
    window.location.href = "../"
})