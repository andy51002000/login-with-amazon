'use strict';

const bhttp = require('bhttp');

const lwa = module.exports;
lwa.error = {};

lwa.error.InvalidResponseError = class InvalidResponseError extends Error {
  /* name and message are probably the minimum,
   * but you can add custom params too ofc */
  constructor() {
    super();
    this.name = 'InvalidResponseError';
    this.message = 'Invalid Response error. Login with Amazon did not return JSON.';
  }
};

lwa.error.InvalidTokenError = class InvalidTokenError extends Error {
  /* name and message are probably the minimum,
   * but you can add custom params too ofc */
  constructor() {
    super();
    this.name = 'InvalidTokenError';
    this.message = 'Invalid Token error. Token is likely expired or malformed.';
  }
};

 /**
  * @param string $accessToken Required
  * @return object {data} or {key: data} depending on options provided
  */
lwa.getProfile = function getProfile(accessToken) {
  const url = 'https://api.amazon.com/user/profile?access_token=' +
                `${encodeURIComponent(accessToken)}`;
  return bhttp.get(url).then((response) => {
    console.log(response);
    if (response.headers['x-amzn-errortype']) {
      const error = response.headers['x-amzn-errortype'].split(':')[0];
      switch (error) {
        case 'InvalidTokenException':
          throw new lwa.error.InvalidTokenError();
        default:
          throw new Error(`Yet be supported error encountered - ${error}`);
      }
    }
    // last ditch error catch
    if (response.body.error_description || response.body.error) {
      throw new Error(`Yet be supported error encountered - ${response.body.error} - `
                       + `${response.body.error_description}`);
    }
    return response.body;
  });
};
