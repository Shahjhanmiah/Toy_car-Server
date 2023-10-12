const express = require("express");
const app = express();
require('dotenv').config
const cors = require("cors")
const { MongoClient, ServerApiVersion, LEGAL_TCP_SOCKET_OPTIONS,ObjectId } = require('mongodb');
const port = process.env.Port || 5000;

// middware
app.use(express.json())
app.use(cors())


const uri = "mongodb+srv://ToyCar:IHws0nEUgdsNk4x3@cluster0.ga6ydds.mongodb.net/?retryWrites=true&w=majority";
// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});


async function run() {
  try {
    const My_toyCollection = client.db('My_Toy').collection('userToy');
    const AddToyCollection = client.db('AddToy').collection('postadd');
   // get api post er datae jn get api 
  
   app.get('/userToy', async (req, res) => {
    const cursor = My_toyCollection.find();
    const result = await cursor.limit(3).toArray();
    res.send(result);
})
   app.get('/userToyid', async (req, res) => {
    const cursor = My_toyCollection.find();
    const result = await cursor.limit(6).toArray();
    res.send(result);
})
// all toy route id 
app.get('/userToyAll/:id', async(req, res) => {
  const id = req.params.id;
  const query = {_id: new ObjectId(id)}
  const result = await My_toyCollection.findOne(query);
  res.send(result);
})

// all Toy route
   app.get('/userToyAll', async (req, res) => {
    const cursor = My_toyCollection.find();
    const result = await cursor.toArray();
    res.send(result);
})
   
 // speck id in backend 

 app.get('/userToyid/:id', async(req, res) => {
  const id = req.params.id;
  const query = {_id: new ObjectId(id)}
  const result = await My_toyCollection.findOne(query);
  res.send(result);
})

// post api get data 
app.get('/postadd', async (req, res) => {
  const cursor = AddToyCollection.find();
  const result = await cursor.toArray();
  res.send(result);
})

// all toy post api  

app.post('/postadd', async (req, res) => {
  const newToy = req.body;
  console.log(newToy);
  const result = await AddToyCollection.insertOne(newToy);
  res.send(result);
})

  // update api in mongodb theke speack in load 
  app.get('/postadd/:id', async(req, res) => {
    const id = req.params.id;
    const query = {_id: new ObjectId(id)}
    const result = await AddToyCollection.findOne(query);
    res.send(result);
})
// put api update api in javascript
app.put('/postadd/:id', async(req, res) => {
  const id = req.params.id;
  const filter = {_id: new ObjectId(id)}
  const options = { upsert: true };
  const updatedToy = req.body;

  const postadd = {
      $set: {
          name: updatedToy.name, 
          quantity: updatedToy.quantity, 
          seller: updatedToy.seller, 
          email: updatedToy.email, 
          price: updatedToy.price, 
          rating: updatedToy.rating, 
          photo: updatedToy.photo,
          description: updatedToy.description,
      }
  }

  const result = await AddToyCollection.updateOne(filter, postadd, options);
  res.send(result);
})
// delete api 

app.delete('/postadd/:id', async (req, res) => {
  const id = req.params.id;
  console.log(id);
  const query = { _id: new ObjectId(id) }
  const result = await AddToyCollection.deleteOne(query);
  res.send(result);
})
   
  }
  finally {




  }
}
run().catch(error => console.log(error))



app.get('/', (req, res) => {
  res.send("ToyCar.js")


})





app.listen(port, () => {
  console.log(`ToyCar is running Port${port}`)
})

//   user name :ToyCar
//  password :xFQGVYIaLCoqVpgC






//  