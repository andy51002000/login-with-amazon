const lwa = require('../index');
jest.mock('bhttp');

// make sure jest is working
test('adds 1 + 2 to equal 3', () => {
  expect(1+2).toBe(3);
});

// Get InvalidTokenError w/ bad token
it('works with promises', () => {
  return lwa.getProfile('bad_token')
    .then((data) => {
    })
    .catch((error) => {
      expect(error).toEqual(new lwa.error.LoginWithAmazonError('invalid_token',
        'invalid token'));
    });
});

// Get InvalidTokenError w/ bad token
it('refreshes token', () => {
  return lwa.refreshAccessToken('good_token', 'clientId', 'clientSecret')
    .then((data) => {
      expect(data.access_token).toEqual('good token response');
    });
});