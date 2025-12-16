const express = require('express');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
require('dotenv').config()
const cors = require('cors')
const app = express();
const port = process.env.PORT || 5000;

app.use(cors())
app.use(express.json())

console.log(process.env.DB_USER)
console.log(process.env.DB_PASS)
const uri = "mongodb+srv://recapeCoffeeStoreServer:4IxodB74bOoLntnz@cluster0.5jen92b.mongodb.net/?appName=Cluster0";

const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

async function run() {
    try{
        await client.connect();
        const coffeeCollection = client.db('recapeCoffeeDB').collection('coffees')

        app.get('/coffees', async(req, res)=>{
            const result = await coffeeCollection.find().toArray();
            res.send(result);
        })

        app.get('/coffees/:id', async(req, res)=>{
            const id = req.params.id;
            const query = {_id: new ObjectId(id)};
            const result = await coffeeCollection.findOne(query);
            res.send(result);
        })

        app.post('/coffees',async(req, res)=>{
            const newCoffee = req.body;
            console.log(newCoffee);
            const result = await coffeeCollection.insertOne(newCoffee);
            res.send(result)
        })

        app.delete('/coffees/:id', async(req, res)=>{
            const id = req.params.id;
            const query = {_id: new ObjectId(id)}
            const result = await coffeeCollection.deleteOne(query);
            res.send(result);
        })



        await client.db('recapeCoffee').command({ping: 1})
        console.log('Pinged your deployment. You successfully connected to MongoDB!')

    }
    finally{

    }
    
}
run().catch(console.dir)




app.get('/', (req, res) => {
    res.send('server side data added to....')
})
app.listen(port, () => {
    console.log(`example app listing on port`, port)
})

