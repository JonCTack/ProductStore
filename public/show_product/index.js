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
        h3Tag.id = "inventory"
        containerElement.appendChild(h3Tag)
        let buyButton = document.createElement('button')
        buyButton.textContent = `BUY NOW`
        if (object.inventory <= 0){
            buyButton.className = 'disabled'
        }
        buyButton.addEventListener('click', async () => {
            let done = await fetch(`/update_product/${params.id}/inventory/${object.inventory - 1}`, {
                method: `PUT`,
                headers: { 'Content-Type': 'application/json' },
            })
            done.json().then( (parsed) => {
                let inventoryElement = document.getElementById('inventory')
                inventoryElement.innerText = `${parsed.inventory - 1} Remaining`
        })
        })
        containerElement.appendChild(buyButton)
        containerDiv.appendChild(containerElement)

    })});
}
getData()

let addButton = document.getElementById('all-products')
addButton.addEventListener('click', () => {
    window.location.href = "../"
})

let delButton = document.getElementById('delete')
delButton.addEventListener('click', async () => {
    if (confirm(`you are sure you want to delete this item?`) == true) {
        let done = await fetch(`/delete_product/${params.id}`, {
            method: `DELETE`,
            headers: { 'Content-Type': 'application/json' },
        })
        done.json().then( () => {
            window.location.href = "../"
      }) 
}})

let editButton = document.getElementById('edit')
editButton.addEventListener('click', () => {
    console.log('changed')
})