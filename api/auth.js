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
  id: '',
  firstname: '',
  lastname: '',
  avatar: '',
  bio: '',
};

//get current user
router.get('/me', (req, res) => {
  return res.json({
    data: {
      user
    }
  });
});

//login

router.post('/login', (req, res) => {
  const { username, password } = req.body;
  // query db.
  client.connect(async (err) => {
    const collection = await client.db("mydb_2").collection("users");
    const data = await collection.find({}).toArray();
    //await console.log(data);
    await data.forEach((info, i, arr) => {
      const x = arr.length;
      if (i != (x - 1)) {
        if (username === info.username && password === info.password) {
          user.username = username;
          user.role = info.role;
          user.id = info.id;
          user.firstname = info.firstname;
          user.lastname = info.lastname;
          user.avatar = info.avatar;
          user.bio = info.bio;
          return res.json({
            data: {
              user,
              token: 'THIS_IS_TOKEN'
            }
          });
        }
      } else if (username === info.username && password === info.password) {
        user.username = username;
        user.role = info.role;
        user.id = info.id;
        user.firstname = info.firstname;
        user.lastname = info.lastname;
        user.avatar = info.avatar;
        user.bio = info.bio;
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
  const { data } = req.body;

  // query db.
  client.connect(async (err) => {
    //const collection = await client.db("mydb_2").collection("users");
    await client.db('mydb_2').collection('users').insertOne(data);
    res.status(200).send(null);
  })
  //client.close();
});



/**show user***/
router.get('/users', (req, res) => {
  client.connect(async (err) => {
    const collection = await client.db("mydb_2").collection("users");
    const data = await collection.find({}).toArray();
    return res.send(data);
  })
  //client.close();
});


/**show user by id***/
router.get('/users/:id', (req, res) => {
  client.connect(async (err) => {
    const id = req.params.id;
    const collection = await client.db("mydb_2").collection("users");
    const data = await collection.find({ 'id': id }).toArray();
    return res.send(data);
  })
  //client.close();
});

//////DELETE USER//////
app.delete('/users/delete', async (req, res) => {
  const id = req.body.id;
  client.connect(async (err) => {
    await client.db('mydb_2').collection('users').deleteOne({ 'id': id });
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

//edit topic//
router.post('/edittopic', (req, res) => {
  const { data } = req.body;
  console.log(data);

  client.connect(async (err) => {
    const collection = await client.db("mydb_2").collection("subject");
    await collection.updateOne({id: data.id,"chapters.topid":data.topid}, {$set : {"chapters.$.title":data.title}});
    await collection.updateOne({id: data.id,"chapters.topid":data.topid}, {$set : {"chapters.$.description":data.description}});
    await collection.updateOne({id: data.id,"chapters.topid":data.topid}, {$set : {"chapters.$.content":data.content}});
    await res.status(200).send(null);
  });
});

///add discuss topic
router.post('/addtopdiscuss', (req, res) => {
  const { discuss } = req.body;

  client.connect(async (err) => {
    await client.db('mydb_2').collection('discuss').insertOne(discuss);
    res.status(200).send(null);
  })
  //client.close();
});

/*-----------delete discussion-----------------*/

app.delete('/discuss/delete', async (req, res) => {
  const id = req.body.id;
  //await console.log(id);

  client.connect(async (err) => {
    await client.db('mydb_2').collection('discuss').deleteOne({ 'id': id });
  })

  res.status(200).send({
    "status": "ok",
    "message": "User with ID = " + id + " is deleted"
  });

})
///edit discuss topic
router.post('/editdiscuss', (req, res) => {
  const { discuss } = req.body;

  client.connect(async (err) => {
    const collection = await client.db("mydb_2").collection("discuss");
    await collection.updateOne({id: discuss.id}, {$set : {title:discuss.title, description: discuss.description, date:new Date().toUTCString()}});
    res.status(200).send(null);
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

//--show discuss by id--//
router.get('/discuss/:id', (req, res) => {
  // query db.
  client.connect(async (err) => {
    const id = req.params.id;
    const collection = await client.db("mydb_2").collection("discuss");
    const data = await collection.find({ 'id': id }).toArray();
    //await data.forEach(console.dir);
    //console.dir(data);
    return res.send(data);
  })
  //client.close();
});

//------add comment---------//
router.post('/addcomments', (req, res) => {

  const { data } = req.body;
  // query db.
  client.connect(async (err) => {
    const collection = await client.db("mydb_2").collection("discuss");
    await collection.updateOne({ id: data.id }, { $push: { comments : { comment:data.comment, user:data.user, cid:(Math.random() + 1).toString(36).substring(2), date: new Date().toUTCString() } } }, { upsert: true });
    await res.status(200).send(null);
  });
  //client.close();
});

//like
router.post('/likecomments', (req, res) => {

  const { data } = req.body;
  client.connect(async (err) => {
    const collection = await client.db("mydb_2").collection("discuss");
    await collection.updateOne({id: data.id,"comments.cid":data.cid}, {$push : {"comments.$.like":data.like} }, { upsert: true });
    await res.status(200).send(null);
  });

});


//------edit comment---------//
router.post('/editcomments', (req, res) => {

  const { data } = req.body;
  client.connect(async (err) => {
    const collection = await client.db("mydb_2").collection("discuss");
    await collection.updateOne({id: data.id,"comments.cid":data.cid}, {$set : {"comments.$.comment":data.comment,"comments.$.date":new Date().toUTCString()}});
    await res.status(200).send(null);
  });

});

//------delete comment---------//
router.post('/delcomments', (req, res) => {

  const { data } = req.body;
  client.connect(async (err) => {
    const collection = await client.db("mydb_2").collection("discuss");
    await collection.updateOne({id: data.id}, {$pull : {comments:data.comment}});
    await res.status(200).send(null);
  });

});




///////////add quiz/////

router.post('/addquiz', (req, res) => {
  // query db.
  client.connect(async (err) => {
    const { data } = req.body;
    console.log(data);
    const collection = await client.db("mydb_2").collection("quiz");
    await collection.updateOne({ id: data.id }, { $push: { quiz : { question:data.question, choice:data.choice, correct:data.correct, qid:(Math.random() + 1).toString(36).substring(2)} } }, { upsert: true });
    //console.dir(data);
    return res.send(null);
  })
  //client.close();
});

//--------------delete quiz
router.post('/delquiz', (req, res) => {
  // query db.
  client.connect(async (err) => {
    const { data } = req.body;
    console.log(data);
    const collection = await client.db("mydb_2").collection("quiz");
    await collection.updateOne({id: data.id}, {$pull : {quiz:data.quiz}});
    //console.dir(data);
    return res.send(null);
  })
  //client.close();
});

//--------------Edit quiz
router.post('/editquiz', (req, res) => {
  const { data } = req.body;
  client.connect(async (err) => {
    const collection = await client.db("mydb_2").collection("quiz");
    await collection.updateOne({id: data.id,"quiz.qid":data.qid}, {$set : {"quiz.$.question":data.question}});
    await collection.updateOne({id: data.id,"quiz.qid":data.qid}, {$set : {"quiz.$.choice":data.choice}});
    await collection.updateOne({id: data.id,"quiz.qid":data.qid}, {$set : {"quiz.$.correct":data.correct}});
    await res.status(200).send(null);
  });
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
  //console.log(data);
  client.connect(async (err) => {
    if (err) throw err;
    const collection = await client.db("mydb_2").collection("subject");
    const info = await collection.find({ 'id': data.id ,"score.uid":data.uid }).toArray();
    if( info == '' ){
      console.log("A");
      await collection.updateOne({ id: data.id }, { $push: { score : { uid:data.uid, score:data.score } } }, { upsert: true });
    }else{
      console.log("B");
      await collection.updateOne({id: data.id,"score.uid":data.uid}, {$set : {"score.$.uid":data.uid}});
      await collection.updateOne({id: data.id,"score.uid":data.uid}, {$set : {"score.$.score":data.score}});
    }
    res.status(200).send(null);
  })
  //client.close();
});

/*-----------show quiz score by user id-----------------*/
router.get('/getscore', (req, res) => {
  // query db.
  const { data }  = req.body;
  console.log(data);
  //console.log(data);
  /*client.connect(async (err) => {
    if (err) throw err;
    const collection = await client.db("mydb_2").collection("subject");
    const info = await collection.find({ 'id': data.id ,"score.uid":data.uid }).toArray();
    return res.send(info);
  })*/
  //client.close();
});

app.use(router)

module.exports = {
  path: '/api',
  handler: app
}