#!/usr/bin/env node
const fs = require("fs");
const url = require("url");
const http = require("http");

let error;
fs.readFile("./404.html", function (err, data) {
  error = data;
});

http
  .createServer(function (req, res) {
    const q = url.parse(req.url, true);
    let filename = "." + q.pathname + ".html";

    if (filename == "./.html") {
      filename = "./index.html";
    }
    fs.readFile(filename, function (err, data) {
      if (err) {
        res.writeHead(404, { "Content-Type": "text/html" });
        res.write(error);
        return res.end();
      }
      res.writeHead(200, { "Content-Type": "text/html" });
      res.write(data);
      return res.end();
    });
  })
  .listen(8080, () => {
    console.log("Server is running at http://localhost:8080");
  });
