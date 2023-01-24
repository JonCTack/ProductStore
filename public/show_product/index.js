
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
        h2Tag.textContent = `PRICE: $${object.price.toFixed(2)}`;
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
            if (object.inventory > 0){
            let done = await fetch(`/update_product/${params.id}/inventory/${object.inventory - 1}`, {
                method: `PUT`,
                headers: { 'Content-Type': 'application/json' },
            })
            done.json().then( (parsed) => {
                window.location.href = `../show_product?id=${params.id}`
        })
        }})
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


let editPanel = document.getElementById('edit-panel')
let editButton = document.getElementById('edit')
let togglePanel = false
editButton.addEventListener('click', () => {
    if (togglePanel == false){
    editPanel.className="";
    togglePanel = true;
    } else {
    editPanel.className="hidden";
    togglePanel = false;
    }
})

let editCommit = document.getElementById('edit-item')
editCommit.addEventListener('click', async () => {
    let nameString = document.getElementById('name-i').value;
    let descString = document.getElementById('desc-i').value;
    let priceNum = +document.getElementById('price-i').value;
    let invNum = +document.getElementById('inv-i').value;
    let linkString = document.getElementById('imgLink-i').value;
    let editArray = [nameString, descString, priceNum, invNum, linkString];
    let keyArray = ["name", "desc", "price", "inventory", "imgLink"]
    editArray.forEach( async (el, i) => {
        if (el != undefined && el != 0){
            let done = await fetch(`/update_product/${params.id}/${keyArray[i]}/${el}`, {
                method: `PUT`,
                headers: { 'Content-Type': 'application/json' },
            })
        }
    })
    window.location.href = `../show_product?id=${params.id}`
})