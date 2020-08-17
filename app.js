const express = require('express')
const app = express()
const port = 3000
const path = require('path')

const pug = require('pug')

const bodyParser = require('body-parser')

const Datastore = require('nedb-promises')
let datastore = Datastore.create('blog.db')

app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'pug')

app.use(express.static('./public'))
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.get('/', (req, res) => {
    res.render('index.pug', {name: 'Jonas'})
})

app.post('/add', (req, res) => {

    console.log(req.body)
    datastore.insert({ title: req.body.title, content: req.body.content })
    res.sendStatus(200)
    
})

app.delete('/delete/:id', (req, res) => {

    console.log(req.params)

    datastore.remove({ _id: req.params.id }, {}, function (err, numRemoved) {
        console.log(numRemoved)
        res.sendStatus(200)
    });
})

app.put('/update/:id', (req, res) => {

    datastore.update({_id : req.params.id}, {title : req.body.title, content : req.body.content}, {});
    
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