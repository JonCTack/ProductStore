# THE EVERYTHING STORE
This project referred to as THE EVERYTHING STORE is a simple fullstack application that is emulating a store front.
<br />
Video here

## The Stack
MERN (MongoDB, Express, React, Node.js)[^1]
- MongoDB
This is a popular document database and one that can be interacted with quite easily through the mongoose Node.js module.
- Express
This is a Node.js module that allows routing of incoming http requests.
- Node
This is a javascript(JS) runtime environment that the whole project is based on.
[^1]: React was not used in this particular project.
## Priorities
This was a project that I created in my software engineer Per Scholas course that requested navigation done by JS, having HOME page with all the products, a PRODUCT page that showed any chosen product and a CREATE page to make brand new products. All of these had to have functionality and interact properly with MongoDB.

<br /> 

During the creation I had personal goals of keeping the css style minimal and creating flexible routes with the server. 
### The Edit Route
This in particular is something I want to go over. Simply put, I chose to have the parameters of the edit route be turned into an object rather than send one through the link. I found doing it this way allowed me to have the same route used between purchasing items (decreasing the inventory count by one) and fully editing items.

<br />

This choice lead to two interesting bits of code I'll share now. First, with the route itself:

<br />

`app.put('/update_product/:product_id/:product_key/:product_value', async (req,res) => {
    let id = req.params.product_id
    let key = req.params.product_key
    let value = req.params.product_value
    let updateObject = { 
        [key] : value
    }
    let updateResponse = await TheInventory.findByIdAndUpdate(id, updateObject )
    res.json(updateResponse)
})`

<br />

This has a comment in the code itself, however, I'll go more in depth here. As it turns out, JS by default is incapable of having a key of an object be a modifiable variable. Passing req.params.product_key assigned that exactly as the key, not the value that variable has. Passing it as a one index array allows it to behave as expected and as needed.

<br />

`let editCommit = document.getElementById('edit-item')
editCommit.addEventListener('click', async () => {
    let nameString = document.getElementById('name-i').value;
    let descString = document.getElementById('desc-i').value;
    let priceNum = document.getElementById('price-i').value;
    let invNum = document.getElementById('inv-i').value;
    let linkString = document.getElementById('imgLink-i').value;
    let editArray = [nameString, descString, priceNum, invNum, linkString];
    let keyArray = ["name", "desc", "price", "inventory", "imgLink"]
    editArray.forEach( async (el, i) => {
        if (el != undefined){
            let done = await fetch('/update_product/${params.id}/${keyArray[i]}/${el}', {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
            })
        }
    })
    window.location.href = '../show_product?id=${params.id}'
})`
*code edited for markdown formatting*
Once again this is mentioned in comments in the code but this deserves some explanation. Part of having the website have minimal aesthetics includes a toggleable edit panel and the option to either edit one, many, or all properties of a product. This option requires iterating through the input array along with an array for the matching keys to send to the code shown earlier.