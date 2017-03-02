const profiles = {
  'Atza|IwEBIC5CCLl6nFiMSh5WT7rvBOLzIS8VqGCTBcS47i8znl2GMKCBdrNkbevO0oZeWuJmadX5f5tV44_tQGtfklE39l11IoEyt7kuhA0xGAsyTciUA-_5EVfg-rK_dcsvJwrPiixgJL-PvZbzPVmuTWxniSS7tfxWVF20k4WqwXvxJ2h87wpMQu3jaxhSK5orrepewhHDMB24gfHQH3tDBRPxAiVTTLziHdP_W4eC4EGP9hKB0R1t9jz6naa19V6JjeIYylDkAy00PIaXS8C1g3jS5eecaxUdVOhOCxBrIeAPiwYLPn1EZZcivNm1KVZK48NlbDTrwPiC-sq-VK13u240gIrAo1NdEz9cim1DPlsnZgHWkJdk7GQVq-K1M9d9fNuqvbjlJIGpaJrv8iwCN_N6oSVF8KmCPQAwlnxkrsHAoMEI3vE7UwiF-pgGOjbK-UpYlhVd-lxBjVAELpW_QmNd1niYDeOcqOxjS7WVVLNgGuKROdlmSrR9rp9N_dl3ngb8tZeXZdOzGrpxsi8-Qu2wr8TH':
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
