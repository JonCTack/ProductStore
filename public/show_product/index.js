
let containerDiv = document.getElementById('product-contain')
const urlSearchParams = new URLSearchParams(window.location.search);
const params = Object.fromEntries(urlSearchParams.entries());
const getData = async () => {
    let data = await fetch(`/get_specific_product/${params.id}`);
    data.json().then((parsed) => {
    parsed.forEach((object) => {
        //similar to the homepage, this dynamically creates the product page
        let pageTitle = document.getElementById('title')
        pageTitle.innerText = `EVERYTHING STORE | ${object.name.toUpperCase()}`;
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
        if (object.inventory <= 0){
            h3Tag.textContent = `OUT OF STOCK`;
        } else {
        h3Tag.textContent = `${object.inventory} Remaining`;}
        h3Tag.id = "inventory"
        containerElement.appendChild(h3Tag)
        let buyButton = document.createElement('button')
        buyButton.textContent = `BUY NOW`
        buyButton.id = "buyButton"
        if (object.inventory <= 0){
            buyButton.className = 'disabled'
        }
        buyButton.addEventListener('click', async () => {
            let inventoryEl = document.getElementById('inventory')
            let buyButton = document.getElementById('buyButton')
            let total = inventoryEl.innerText.replace(/\D/g, "")
            if (total > 0 && buyButton.className !== 'disabled'){
            let done = await fetch(`/update_product/${params.id}/inventory/${total - 1}`, {
                method: `PUT`,
                headers: { 'Content-Type': 'application/json' },
            })
            done.json().then( (parsed) => {
            let total = parsed.inventory - 1
            if (total <= 0){
                inventoryEl.textContent = `OUT OF STOCK`;
                buyButton.className = 'disabled'
            } else {
                inventoryEl.textContent = `${total} Remaining`;}
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
    //I thought of using a module that would have customizable alert boxes but decided against it for this project
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
    let priceNum = document.getElementById('price-i').value;
    let invNum = document.getElementById('inv-i').value;
    let linkString = document.getElementById('imgLink-i').value;
    let editArray = [nameString, descString, priceNum, invNum, linkString];
    let keyArray = ["name", "desc", "price", "inventory", "imgLink"]
    //This allows one form to flexibly only edit one thing of a product but it must iterate through the full array
    //I could have passed a new object instead of using this to create one through the server (possibly six times each) but I wanted to use only one update route across the whole website
    editArray.forEach( async (el, i) => {
        if (el != undefined){
            let done = await fetch(`/update_product/${params.id}/${keyArray[i]}/${el}`, {
                method: `PUT`,
                headers: { 'Content-Type': 'application/json' },
            })
        }
    })
    window.location.href = `../show_product?id=${params.id}`
})