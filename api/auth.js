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
  role: '--',
};

//get current user
router.get('/me', (req, res) => {
  return res.json({
    data: {
      user
    }
  });
});

/*/logout-----UNUSED DELETE LATER/////////
router.post('/logout', (req, res) => {
  user.username = '';
  user.role = 'role';
  res.status(200);
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
/**show user***/
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
  //await console.log(id);

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

/*-----------show subject by ID-----------------*/

router.get('/subject/:id', (req, res) => {
  // query db.
  client.connect(async (err) => {
    const id = req.params.id;
    const collection = await client.db("mydb_2").collection("subject");
    const data = await collection.find({ 'id': id }).toArray();
    //await data.forEach(console.dir);
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
    await client.db('mydb_2').collection('quiz').insertOne({id:subject.id,quiz:[]});
  })
  res.status(200).send(null);
  //client.close();
});

/*-----------delete subject-----------------*/

app.delete('/subject/delete', async (req, res) => {
  const id = req.body.id;
  //await console.log(id);

  client.connect(async (err) => {
    await client.db('mydb_2').collection('subject').deleteOne({ 'id': id });
    await client.db('mydb_2').collection('quiz').deleteOne({ 'id': id });
  })

  res.status(200).send({
    "status": "ok",
    "message": "User with ID = " + id + " is deleted"
  });

})

/*- Add topic -*/

router.post('/addtopic', (req, res) => {
  const { data } = req.body;
  //const rand = Math.random();
  console.log(data);

  client.connect(async (err) => {
    const collection = await client.db("mydb_2").collection("subject");
    await collection.updateOne({ id: data.id }, { $push: { chapters : { title:data.title, description:data.description, content:data.content,topid:(Math.random() + 1).toString(36).substring(2)} } }, { upsert: true });
    await res.status(200).send(null);
  });
  //res.status(200);
  //client.close();
});

//delete topic//
router.post('/deltopic', (req, res) => {
  const { data } = req.body;
  //const rand = Math.random();
  //console.log(data);

  client.connect(async (err) => {
    const collection = await client.db("mydb_2").collection("subject");
    await collection.updateOne({id: data.id}, {$pull : {chapters:data.topic}});
    //const collection = await client.db("mydb_2").collection("subject");
    //collection.updateOne({ id: data.id }, { $pull: { chapters : { title:data.title, description:data.description, content:data.content} } });
    await res.status(200).send(null);
  });
  //res.status(200);
  //client.close();
});
//delete topic//
router.post('/edittopic', (req, res) => {
  const { data } = req.body;
  //const rand = Math.random();
  console.log(data);

  client.connect(async (err) => {
    const collection = await client.db("mydb_2").collection("subject");
    //await collection.updateOne({id: data.id,"chapters.title":data.title}, {$set : {"chapters.$.title":data.title,"chapters.$.description":data.description,"chapters.$.content":data.content}});
    await collection.updateOne({id: data.id,"chapters.topid":data.topid}, {$set : {"chapters.$.title":data.title}});
    await collection.updateOne({id: data.id,"chapters.topid":data.topid}, {$set : {"chapters.$.description":data.description}});
    await collection.updateOne({id: data.id,"chapters.topid":data.topid}, {$set : {"chapters.$.content":data.content}});
    //const collection = await client.db("mydb_2").collection("subject");
    //collection.updateOne({ id: data.id }, { $pull: { chapters : { title:data.title, description:data.description, content:data.content} } });
    await res.status(200).send(null);
  });
  //res.status(200);
  //client.close();
});



router.post('/login', (req, res) => {
  const { username, password, role } = req.body;
  // query db.
  client.connect(async (err) => {
    const collection = await client.db("mydb_2").collection("users");
    const data = await collection.find({}).toArray();
    //await console.log(data);
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
      res.status(401).send('Invalid Data');
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
    res.status(200).send(null);
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
router.post('/score', (req, res) => {
  // query db.
 
  const { data }  = req.body;
  client.connect(async (err) => {
    if (err) throw err;
    const collection = await client.db("mydb_2").collection("subject");
    collection.updateOne({ id: data.id },{$set: { score: data.score }},{upsert: true});
    //console.dir(data);
    res.status(200).send(null);
  })
  //client.close();
});

app.use(router)

module.exports = {
  path: '/api',
  handler: app
}