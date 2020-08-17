const Datastore = require('nedb-promises')
let datastore = Datastore.create('blog.db')

// #1
/*
datastore.find({ field: true })
  .then(...)
  .catch(...)
  
// #2
datastore.find({ field: true })
  .exec(...)
  .then(...)
  .catch(...)

// #1 and #2 are equivalent

datastore.findOne({ field: true })
  .then(...)
  .catch(...)
    datastore.load(...)
  .then(...)
  .catch(...
*/

datastore.insert({ title: 'Fin dag', content: 'Idag åt jag frukost' })

// lägga till kommentarer kopplat till ett inlägg

/*
  .then(...)
  .catch(...)
*/

  