const express = require("express");
const fs = require("fs");
const http = require("http");
const app = express();

app.use(express.static(`${__dirname}/public`));

app.get("/", (req, res) => {
  fs.readFile('index.html', function(err, data) {
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.write(data);
    return res.end();
  });
  //res.end("Hi, server up");
});

app.listen(3000, "localhost", () => {
  console.log("Server is running on port 3000");
})