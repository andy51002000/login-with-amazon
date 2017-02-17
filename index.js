var https = require("https");
 /**
  * @param string $accessToken Required
  * @param string $key Optional Lets you namespace the return value
  * @return object {data} or {key: data} depending on options provided
  */
exports.getProfilePromise = function (accessToken, key) {
  return new Promise(function (resolve, reject) {
    var url = "https://api.amazon.com/user/profile?access_token="+
                  encodeURIComponent(accessToken);
    var req = https.get(url, function (res) {
      var body = "";
      res.setEncoding("utf8");
      res.on("data", function (chunk) {
        body += chunk;
      });
      res.on("end", function () {
        var data = JSON.parse(body);
        if(data.error_description) {
          console.error("Error getting Amazon Profile - "+JSON.stringify(body));
          return reject(new Error(body));
        } else {
          var result = {};
          if (key) {
            result[key] = data;
          } else {
            result = data;
          }
          resolve(result);
        }
      });
    }).on("error", function (err) {
      console.error("Error getting Amazon Profile - "+JSON.stringify(err));
      return reject(err);
    });
    req.end();
  });
};