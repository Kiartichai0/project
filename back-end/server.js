//import { MongoClient } from 'mongodb';

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

router.get('/me', (req, res) => {
  return res.json({
    data: {
      user
    }
  });
});

router.post('/login', (req, res) => {
  const { email, password } = req.body;

  // query db.
  client.connect(async (err) => {
    const collection = await client.db("mydb_1").collection("test_user");
    const data = await collection.findOne();
    //await data.forEach(info => console.dir(info) );
    //await console.log(data);


    if ((email === 'admin@admin.com' && password === '123456') || (email === data.username && password === data.password)) {
      return res.json({
        data: {
          user,
          token: 'THIS_IS_TOKEN'
        }
      });
    } else {
      return res.status(401).json({
        message: 'Invalid Password'
      });
    }
    
    //client.close();
  })
  client.close();
});

app.use('/api', router);

app.listen(12345, () => {
  console.log('Mock API start on port 12345');
});