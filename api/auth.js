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
  username: '',
  role: '',
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

/*///READ USERS -----> UNUSED DELETE LATER////
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
/**show user*/
router.get('/users', (req, res) => {
  // query db.
  client.connect(async (err) => {
    const collection = await client.db("mydb_2").collection("users");
    const data = await collection.find({}).toArray();
    //await data.forEach(console.dir);
    //console.dir(data);
    return res.send(data);
  })
  //client.close();
});

//////DELETE USER//////
app.delete('/users/delete', async (req, res) => {
  const id = req.body.id;
  await console.log(id);

  client.connect(async (err) => {
    await client.db('mydb_2').collection('users').deleteOne({ 'username': id });
  })

  res.status(200).send({
    "status": "ok",
    "message": "User with ID = " + id + " is deleted"
  });

})



/*-----------show subject-----------------*/
router.get('/subject', (req, res) => {
  // query db.
  client.connect(async (err) => {
    const collection = await client.db("mydb_2").collection("subject");
    const data = await collection.find({}).toArray();
    //console.dir(data);
    return res.send(data);
  })
  //client.close();
});

/*-----------add subject-----------------*/

router.post('/addsubject', (req, res) => {
  const { subject } = req.body;

  client.connect(async (err) => {
    await client.db('mydb_2').collection('subject').insertOne(subject);
  })
  //client.close();
});

/*-----------delete subject-----------------*/

app.delete('/subject/delete', async (req, res) => {
  const id = req.body.id;
  await console.log(id);

  client.connect(async (err) => {
    await client.db('mydb_2').collection('subject').deleteOne({ 'title': id });
  })

  res.status(200).send({
    "status": "ok",
    "message": "User with ID = " + id + " is deleted"
  });

})


router.post('/addtopic', (req, res) => {
  const { subject } = req.body;
  //const rand = Math.random();

  client.connect(async (err) => {
    await client.db('mydb_2').collection('subject').updateOne({ name: subject }, { $set: { content: { x: "" } } }, { upsert: true });
  })
  //client.close();
});

/*-----------show subject by ID-----------------*/

router.get('/subject/:id', (req, res) => {
  // query db.
  client.connect(async (err) => {
    const id = req.params.id;
    const collection = await client.db("mydb_2").collection("subject");
    const data = await collection.find({ 'id': id }).toArray();
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
    const data = await collection.find({}).toArray();
    await console.log(data);
    await data.forEach((info, i, arr) => {
      const x = arr.length;
      if (i != (x - 1)) {
        if (username === info.username && password === info.password && role === info.role) {
          user.username = username;
          user.role = role;
          return res.json({
            data: {
              user,
              token: 'THIS_IS_TOKEN'
            }
          });
        }
      } else if (username === info.username && password === info.password && role === info.role) {
        user.username = username;
        user.role = role;
        return res.json({
          data: {
            user,
            token: 'THIS_IS_TOKEN'
          }
        });
      }
      else {
        return res.status(401);
        /*return res.status(401).json({
          message: 'Invalid Password'
        });*/
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

router.post('/adddiscuss', (req, res) => {
  const { discuss } = req.body;

  client.connect(async (err) => {
    await client.db('mydb_2').collection('discuss').insertOne(discuss);
  })
  //client.close();
});

/*-----------show discussion-----------------*/
router.get('/discuss', (req, res) => {
  // query db.
  client.connect(async (err) => {
    const collection = await client.db("mydb_2").collection("discuss");
    const data = await collection.find({}).toArray();
    //console.dir(data);
    return res.send(data);
  })
  //client.close();
});

router.get('/showcomments', (req, res) => {
  // query db.
  client.connect(async (err) => {
    const collection = await client.db("mydb_2").collection("discuss");
    const data = await collection.find({}).toArray();
    //console.dir(data);
    return res.send(data);
  })
  //client.close();
});

router.post('/addcomments', (req, res) => {

  const { id, comment, allcomment } = req.body;
  // query db.
  client.connect(async (err) => {
    //const collection = await client.db("mydb_2").collection("users");
    await client.db('mydb_2').collection('discuss').updateOne({ _id: id }, {
      $set: {
        comments: { allcomment, comment }
      }
    });
  })
  //client.close();
});

/*-----------show quiz-----------------*/
router.get('/quiz/:id', (req, res) => {
  // query db.
  client.connect(async (err) => {
    const id = req.params.id;
    const collection = await client.db("mydb_2").collection("quiz");
    const data = await collection.find({ 'id': id }).toArray();
    //console.dir(data);
    return res.send(data);
  })
  //client.close();
});

/*-----------save quiz score-----------------*/
/*router.put('/score', (req, res) => {
  // query db.
  const s = req.body;
  client.connect(async (err) => {
    const collection = await client.db("mydb_2").collection("quiz");
    const data = await collection.updateOne(
      { id:s.id },
      {$set: {
          'score':s.score 
        }
      },{upsert:true});
    //console.dir(data);
    return res.send(data);
  })
  //client.close();
});*/

app.use(router)

module.exports = {
  path: '/api',
  handler: app
}