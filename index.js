var https = require("https");

 /**
  * @param string $accessToken Required
  * @return object {data} or {key: data} depending on options provided
  */
exports.getProfile = function (accessToken, callback) {
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
      callback(null, data);
    });
  }).on("error", function (err) {
    console.error("Error getting Amazon Profile - "+JSON.stringify(err));
    callback(err);
  });
  req.end();
};