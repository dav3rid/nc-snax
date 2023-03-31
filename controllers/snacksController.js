const { fetchSnacks, addSnack } = require('../models/snacksModel');

function getSnacks(request, response) {
  fetchSnacks().then((snacks) => {
    response.status(200).send({ snacks });
  });
}

function postSnack(request, response, next) {
  const newSnack = request.body;
  addSnack(newSnack)
    .then((snack) => {
      response.status(201).send({ snack });
    })
    .catch((err) => {
      next(err);
    });
}

module.exports = { getSnacks, postSnack };
