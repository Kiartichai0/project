import { MongoClient } from 'mongodb';

//const { MongoClient } = require('mongodb');

const uri = "mongodb+srv://kiartichai:94IHyNUlUXII6MFt@cluster0.3vhe9.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

/*client.connect();
const collection = client.db("mydb_1").collection("users");
const data = collection.find();
data.forEach(console.dir);
client.close();*/
//export {mongo};

//export default client;

client.connect( async (err) => {
  const collection = await client.db("mydb_1").collection("users");
  const data = await collection.find();
  //console.log(data);
  await data.forEach(console.dir);
  //await cursor.forEach(console.dir);
  // perform actions on the collection object
  client.close();
})

export default client;