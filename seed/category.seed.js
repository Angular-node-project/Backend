const mongoose = require('mongoose');
const Category = require('../models/category.model'); 


const dbURI ='mongodb+srv://sarahsalem9898:tCIooq7nagBwiJZm@angular-node-cluster.qaz70.mongodb.net/ecommerce-stage';

mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to MongoDB');
    seedCategories();
  })
  .catch((err) => {
    console.error('Error connecting to MongoDB', err);
  });

async function seedCategories() {
  // Categories to insert
  const categories = [
    { name: 'Herbs seeds' },
    { name: 'Medium Plants' },
    { name: 'Plant bundle' },
    { name: 'Air purifying' },
    { name: 'Large Plants' },
    { name: 'Low maintenance' },
    { name: 'Ceramic pots' },
    { name: 'Plant bundle' },
    { name: 'Plant accessories' },
    { name: 'Indoor Plants' },
    { name: 'Small Plants' }
  ];

  try {
    // Delete all existing categories first
    await Category.deleteMany({});
    console.log('Deleted existing categories');

    // Insert new categories
    const insertedCategories = await Category.insertMany(categories);
    console.log('Categories inserted:', insertedCategories);

    // Close the connection after seeding is done
    mongoose.connection.close();
  } catch (error) {
    console.error('Error seeding categories:', error);
    mongoose.connection.close();
  }
}
