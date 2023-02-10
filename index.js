const mongoose = require('mongoose');

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require('./models/Recipe.model');
// Import of the data from './data.json'
const data = require('./data');

const MONGODB_URI = 'mongodb://localhost:27017/recipe-app';

// Connection to the database "recipe-app"
mongoose
  .connect(MONGODB_URI)
  .then(x => {
    console.log(`Connected to the database: "${x.connection.name}"`);
    // Before adding any recipes to the database, let's remove all existing ones
    return Recipe.deleteMany()
  })
  .then(async () => {
    // Run your code here, after you have insured that the connection was made
    const carrotCake = await Recipe.create({
      title: 'Carrot Cakee',
      level: 'Easy Peasy',
      ingredients: 'carrot',
      cuisine: 'cake',
      dishType: 'dessert',
      image: '',
      duration: 30,
      creator: 'Haroun',
      created: '',
    })
    const manyRecipe = await Recipe.insertMany(data)
    const filter = { title: 'Rigatoni alla Genovese' }
    const update = { duration: 100 }
    let updateRig = await Recipe.findOneAndUpdate(filter, update)
    console.log('update succesful')
    const deleteCake = await Recipe.deleteOne({ title: 'Carrot Cake' })
    console.log('delete succesful')
  })

  .catch(error => {
    console.error('Error connecting to the database', error);
  })
  .finally(() => {
    mongoose.connection.close()
  })
