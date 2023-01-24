const express = require('express');
const mongoose = require('mongoose')
require('dotenv').config();
const app = express();
let port = 5000;
const TheInventory = require('./models/inventory')

let connectionString = `mongodb+srv://${process.env.MONGOUSERNAME}:${process.env.MONGOPASSWORD}@mongosetupcluster.easzlik.mongodb.net/Product?retryWrites=true&w=majority`

mongoose.set('strictQuery', false);

mongoose.connect(connectionString, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});
mongoose.connection.once('open', ()=> {
    console.log('connected to mongo');
});


app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.get('/get_products', async (req,res) => {
    let response = await TheInventory.find({});
    res.json(response)
})

app.get('/get_specific_product/:product_id', async (req,res) => {
    let response = await TheInventory.find({_id: req.params.product_id});
    res.json(response)
})

app.post("/create_product", async (req, res) => {
    let returnedVal = await TheInventory.create({
        name: req.body.nameString,
        desc: req.body.descString,
        price: req.body.priceNum,
        inventory: req.body.invNum,
        imgLink: req.body.linkString
    })
    console.log(returnedVal)
    res.send(returnedVal)
})

app.put('/update_product/:product_id/:product_key/:product_value', async (req,res) => {
    let id = req.params.product_id
    let key = req.params.product_key
    let value = req.params.product_value
    let updateObject = {
        [key] : value
    }
    let updateResponse = await TheInventory.findByIdAndUpdate(id, updateObject )
    res.json(updateResponse)
})


app.listen(port, () => {
    console.log(`Server is Listening on `+ port);
})
