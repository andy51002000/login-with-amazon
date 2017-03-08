const profiles = {
  bad_token:
  {
    headers: {
      'x-amzn-errortype': 'InvalidTokenException:blah',
    },
    body: {
      error: 'invalid_token',
      error_description: 'invalid token',
    },
  },
};

const refreshResponses = {
  good_token:
  {
    headers: {
    },
    body: {
      access_token: 'good token response',
    },
  },
};

const bhttp = module.exports;

bhttp.get = function get(url) {
  return new Promise((resolve, reject) => {
    if (url.match('/user/profile')) {
      const token = decodeURIComponent(url.split('access_token=')[1]);
      resolve(profiles[token]);
    }
    reject("don't know what to do");
  });
};

bhttp.post = function post(url, params, options) {
  return new Promise((resolve, reject) => {
    if (url.match('/auth/o2/token') && params.refresh_token) {
      resolve(refreshResponses[params.refresh_token]);
    }
    reject("don't know what to do");
  });
};
