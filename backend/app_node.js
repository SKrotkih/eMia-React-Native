const http = require("http");
const fs = require('fs').promises;

const host = 'localhost';
const port = 8000;

let indexFile;

const users = JSON.stringify([
  { title: "The Alchemist", author: "Paulo Coelho", year: 1988 },
  { title: "The Prophet", author: "Kahlil Gibran", year: 1923 }
]);

const posts = JSON.stringify([
  { name: "Paulo Coelho", countryOfBirth: "Brazil", yearOfBirth: 1947 },
  { name: "Kahlil Gibran", countryOfBirth: "Lebanon", yearOfBirth: 1883 }
]);

const requestListener = function (req, res) {
  res.setHeader("Content-Type", "application/json");
  switch (req.url) {
    case "/users":
      res.writeHead(200);
      res.end(users);
      break
    case "/posts":
      res.writeHead(200);
      res.end(posts);
      break
    case "/about":
      res.setHeader("Content-Type", "text/html");
      res.writeHead(200);
      res.end(indexFile);
      break
    default:
      res.writeHead(404);
      res.end(JSON.stringify({error:"Resource not found"}));
  }
};
const server = http.createServer(requestListener);

fs.readFile(__dirname + "/index.html")
  .then(contents => {
    indexFile = contents;
    server.listen(port, host, () => {
      console.log(`Server is running on http://${host}:${port}`);
    });
  })
  .catch(err => {
    console.error(`Could not read index.html file: ${err}`);
    process.exit(1);
  });
