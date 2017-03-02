const profiles = {
  'bad_token':
  {
    headers: {
      'x-amzn-errortype': 'InvalidTokenException:blah',
    },
    body: 'mock response',
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
