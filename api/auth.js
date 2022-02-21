const { MongoClient } = require('mongodb');

const uri = "mongodb+srv://kiartichai:94IHyNUlUXII6MFt@cluster0.3vhe9.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

const express = require('express');
const cors = require('cors');

const app = express();
const router = express.Router();

app.use(cors());
app.use(express.json());

const user = {
  id: 1,
  username: 'john',
  email: 'john@doe.com',
  name: 'John Doe'
};


//////UNUSED DELETE LATER/////
const subject = {
  title: 'math',
  chapter1: {
    title: 'chapter1',
    content: 'What is Lorem Ipsum?\n' +
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
  },
  chapter2: { title: 'chapter2', content: 'this is chapter 2' }
};

/*client.connect(async (err) => {
  const collection = await client.db("mydb_2").collection("subject");
  const data = await collection.findOne();
  //await data.forEach(console.dir);
  console.dir(data);
  this.subject = data;
})
client.close();*/



router.get('/me', (req, res) => {
  return res.json({
    data: {
      user
    }
  });
});

////READ USERS -----> UNUSED DELETE LATER////
app.get('/users', async (req, res) => {
  const id = parseInt(req.params.id);
  const client = new MongoClient(uri);
  await client.connect();
  const users = await client.db('mydb_1').collection('users').find({}).toArray();
  await client.close();
  res.status(200).send(users);
})

////READ USERS by ID-----> UNUSED DELETE LATER////
app.get('/users/:id', async (req, res) => {
  const id = parseInt(req.params.id);
  const client = new MongoClient(uri);
  await client.connect();
  const user = await client.db('mydb_1').collection('users').findOne({ "id": id });
  await client.close();
  res.status(200).send({
    "status": "ok",
    "user": user
  });
})
/*//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


/*-----------show subject-----------------*/
router.get('/subject', (req, res) => {
  // query db.
  client.connect(async (err) => {
    const collection = await client.db("mydb_2").collection("subject");
    const data = await collection.find({}).toArray();
    //await data.forEach(console.dir);
    console.dir(data);
    return res.send(data);
  })
  //client.close();
});



router.post('/login', (req, res) => {
  const { username, password, role } = req.body;

  // query db.
  client.connect(async (err) => {
    const collection = await client.db("mydb_2").collection("users");
    const data = await collection.find();
    await data.forEach(info => {
      if (username === info.username && password === info.password && role === info.role) {
        user.username = username;
        return res.json({
          data: {
            username,
            token: 'THIS_IS_TOKEN'
          }
        });
      }
    }
    );   
  })
  //client.close();
});

router.post('/register', (req, res) => {
  const { username, password, role } = req.body;

  // query db.
  client.connect(async (err) => {
    //const collection = await client.db("mydb_2").collection("users");
    await client.db('mydb_2').collection('users').insertOne({
      username: username,
      password: password,
      role: role,
    }); 
  })
  //client.close();
});


app.use(router)

module.exports = {
  path: '/api',
  handler: app
}