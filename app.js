const express = require('express');
const { getSnacks, postSnack } = require('./controllers/snacksController');
const { getDrinkById } = require('./controllers/drinksController');

const app = express();

app.use(express.json());

app.get('/api', (req, res) => {
  res
    .status(200)
    .send({ msg: 'four little bears!!! ʕ•́ᴥ•̀ʔっʕ•́ᴥ•̀ʔっʕ•́ᴥ•̀ʔっʕ•́ᴥ•̀ʔっ' });
});

app.get('/api/snacks', getSnacks);

app.get('/api/hello', (req, res, next) => {
  res.status(200).send({ msg: 'Hey everyone! Hope you enjoyed back end!' });
});

app.get('/api/drinks/:drink_id', getDrinkById);

app.post('/api/snacks', postSnack);

app.use((err, req, res, next) => {
  if (err.status === 400) {
    res.status(400).send({ msg: err.msg });
  } else {
    next(err);
  }
});
app.use((err, req, res, next) => {
  console.log(err); // debugging tool
  res.status(500).send({ msg: "oops I did a bad soz :'( " });
});

module.exports = app;
