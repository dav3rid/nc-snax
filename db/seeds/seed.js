const db = require('../connection');
const format = require('pg-format');

const seed = async ({ snacksData, drinksData, categoriesData }) => {
  return db
    .query(`DROP TABLE IF EXISTS snacks;`)
    .then(() => {
      return db.query(`DROP TABLE IF EXISTS drinks;`);
    })
    .then(() => {
      return db.query(`DROP TABLE IF EXISTS categories;`);
    })
    .then(() => {
      return db.query(`CREATE TABLE snacks (
                snack_id SERIAL PRIMARY KEY,
                snack_name TEXT NOT NULL,
                snack_description TEXT NOT NULL);`);
    })
    .then(() => {
      return db.query(`
                CREATE TABLE drinks (
                    drink_id SERIAL PRIMARY KEY,
                    drink_name TEXT,
                    drink_description TEXT
                );`);
    })
    .then(() => {
      return db.query(
        `CREATE TABLE categories(
                category_id SERIAL PRIMARY KEY,
                category_name TEXT)`
      );
    })
    .then(() => {
      const insertSnacksQueryStr = format(
        'INSERT INTO snacks (snack_name, snack_description) VALUES %L RETURNING *;',
        snacksData.map(({ snack_name, snack_description }) => [
          snack_name,
          snack_description
        ])
      );
      return db.query(insertSnacksQueryStr);
    })
    .then(() => {
      const insertDrinksQueryStr = format(
        'INSERT INTO drinks (drink_name, drink_description) VALUES %L RETURNING *;',
        drinksData.map(({ drink_name, drink_description }) => [
          drink_name,
          drink_description
        ])
      );
      return db.query(insertDrinksQueryStr);
    })
    .then(() => {
      const insertCategoriesQueryStr = format(
        'INSERT INTO categories (category_name) VALUES %L RETURNING *;',
        categoriesData.map(({ category_name }) => [category_name])
      );
      return db.query(insertCategoriesQueryStr);
    });
};

module.exports = seed;
