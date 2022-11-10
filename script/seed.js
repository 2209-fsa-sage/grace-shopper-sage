'use strict';

const {
  db,
  models: { User, Product },
} = require('../server/db');

/**
 * seed - this function clears the database, updates tables to
 *      match the models, and populates the database.
 */
async function seed() {
  await db.sync({ force: true }); // clears db and matches models to tables
  console.log('db synced!');

  // Creating Users
  const users = await Promise.all([
    User.create({
      email: 'cody@mail.com',
      firstName: 'cody',
      lastName: 'johnston',
      password: '123',
      makeAdmin: true,
    }),
    User.create({
      email: 'jeanluc@mail.com',
      firstName: 'jean-luc',
      lastName: 'picard',
      password: '123',
      makeAdmin: true,
    }),
    User.create({
      email: 'frank@mail.com',
      firstName: 'frank',
      lastName: 'sinatra',
      password: '123',
    }),
    User.create({
      email: 'lucy@mail.com',
      firstName: 'lucy',
      lastName: 'liu',
      password: '123',
    }),
    User.create({
      email: 'saul@mail.com',
      firstName: 'saul',
      lastName: 'goodman',
      password: '123',
    }),
  ]);

  const products = await Promise.all([
    Product.create({
      title: 'Shirt',
      price: 15,
      category: 'Clothes',
    }),
    Product.create({
      title: 'Pants',
      price: 15,
      category: 'Clothes',
    }),
    Product.create({
      title: 'Mug',
      price: 15,
      category: 'Utensils',
    }),
    Product.create({
      title: 'Beer Stein',
      price: 15,
      category: 'Utensils',
    }),
  ]);

  console.log(`seeded ${users.length} users and ${products.length} products`);
  console.log(`seeded successfully`);
  return {
    users: {
      cody: users[0],
      murphy: users[1],
    },
  };
}

/*
 We've separated the `seed` function from the `runSeed` function.
 This way we can isolate the error handling and exit trapping.
 The `seed` function is concerned only with modifying the database.
*/
async function runSeed() {
  console.log('seeding...');
  try {
    await seed();
  } catch (err) {
    console.error(err);
    process.exitCode = 1;
  } finally {
    console.log('closing db connection');
    await db.close();
    console.log('db connection closed');
  }
}

/*
  Execute the `seed` function, IF we ran this module directly (`node seed`).
  `Async` functions always return a promise, so we can use `catch` to handle
  any errors that might occur inside of `seed`.
*/
if (module === require.main) {
  runSeed();
}

// we export the seed function for testing purposes (see `./seed.spec.js`)
module.exports = seed;
