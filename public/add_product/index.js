let sendItemButton = document.getElementById('send-item');

sendItemButton.addEventListener('click', async () =>{
    let nameString = document.getElementById('name-i').value
    let descString = document.getElementById('desc-i').value
    let priceNum = +document.getElementById('price-i').value
    let invNum = +document.getElementById('inv-i').value
    let linkString = document.getElementById('imgLink-i').value
    const item = {
        nameString,
        descString,
        priceNum,
        invNum,
        linkString
    }
    if (nameString && descString && priceNum && invNum && linkString){
    let response = await fetch('/create_product',{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(item),
    })
    let uploadStatusTag = document.getElementById('upload-status');
    console.log(response.status);
    if (response.status === 200) {
        window.location.href = "../"
    } else {
        console.log(response);
        console.log("upload failed");
        console.log;
        uploadStatusTag.textContent = "Upload Failed";
        uploadStatusTag.style.color = "red";
    }}
})

let homeButton = document.getElementById('all-products')

homeButton.addEventListener('click', () => {
    window.location.href = "../"
})


