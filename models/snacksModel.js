const pool = require('../db/connection');

exports.fetchSnacks = () => {
  return pool.query('SELECT * FROM snacks').then(({ rows: snacks }) => {
    return snacks;
  });
};

exports.addSnack = (newSnack) => {
  const { snack_name, snack_description } = newSnack;

  if (!snack_name || !snack_description) {
    return Promise.reject({
      status: 400,
      msg: 'you did a bad request not my problem'
    });
  }

  return pool
    .query(
      `INSERT INTO snacks (snack_name, snack_description) VALUES ($1, $2) RETURNING *;`,
      [snack_name, snack_description]
    )
    .then(({ rows }) => {
      return rows[0];
    });
};
