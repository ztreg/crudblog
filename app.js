const express = require('express')
const app = express()
const port = 3000
const path = require('path')

const pug = require('pug')

const bodyParser = require('body-parser')

const Datastore = require('nedb-promises')
const { json } = require('body-parser')
let datastore = Datastore.create('blog.db')
let db2 = Datastore.create('commentdb.db')

app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'pug')

app.use(express.static('./public'))
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.get('/', (req, res) => {
    res.render('index.pug', {name: 'Jonas'})
})

app.post('/add', async (req, res) => {

    //console.log(req.body)
    try {
     const result = await datastore.insert({ title: req.body.title, content: req.body.content })
     res.json({result}).status(200)
    } catch(e) {
      res.json({message: e}).status(400)
    }
  
})

app.post('/addcomment/:blogid', async (req, res) => {

  try {
    const result = await db2.insert({ blogid: req.params.blogid, comment: req.body.comment })
    res.json({result}).status(200)
  } catch (e) {
    res.json({message: e}).status(400)
  } 

})

app.delete('/delete/:id', async (req, res) => {

    try {
     const result = await datastore.remove({ _id: req.params.id }, {}, function (err, numRemoved) {})
     res.json({result}).status(200)
    } catch (e) {
      res.json({message: e}).status(400)
    }
  
    
})

app.put('/update/:id', async (req, res) => {

  try {
    const result = await datastore.update({_id : req.params.id}, {title : req.body.title, content : req.body.content}, {});
    res.json({result})
  } catch(e) {
    res.json({message : e}).status(400)
  }
})

//Statisk
app.get('/pugtest', (req, res) => {
    
    res.render('index.pug', {name: 'Jonas'})
  })


app.get('/json', (req, res) => {
    res.json({ frukt: 'äpple'})
})

app.get('/file', (req, res) => {
  res.sendFile('public/files/hej.html', {root: __dirname})
})


app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})

//dynamisk
/*app.post('/updateComment:commentId', (req, res) => {
  req.params.commendID
  res.render('index.pug', {name})
})
*/

//Nestlad dynamisk
/*app.post('/posts:postID /commentId:commentId', (req, res) => {
    req.params.commendID
    res.render('index.pug', {name})
  })
*/