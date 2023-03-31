const { add } = require('../utils');

describe('add', () => {
  test('adds 2 numbers together', () => {
    expect(add(1, 2)).toBe(3);
  });
});
