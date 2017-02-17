var https = require("https");

exports.getAmazonProfilePromise = (accessToken) => {
  return new Promise(function (resolve, reject) {
    let url = "https://api.amazon.com/user/profile?access_token="+
                  encodeURIComponent(accessToken);
    var req = https.get(url, (res) => {
      let body = "";
      res.setEncoding("utf8");
      res.on("data", (chunk) => {
        body += chunk;
      });
      res.on("end", () => {
        let data = JSON.parse(body);
        if(data.error_description) {
          console.error("Error getting Amazon Profile - "+JSON.stringify(body));
          return reject(new Error(body));
        } else {
          resolve({"Amazon":{data}});
        }
      });
    }).on("error", (err) => {
      console.error("Error getting Amazon Profile - "+JSON.stringify(err));
      return reject(err);
    });
    req.end();
  });
};