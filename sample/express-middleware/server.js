const express = require("express");
const app = express();

const { VersionifyMiddleware } = require("./lib");

app.use(VersionifyMiddleware("1.0.0", "endpoint-version"));

app.get("/", (req, res) =>
  res.send(`Request require api version ${req.versionify["version"]}`)
);

app.listen(8080, () => console.log("Example app listening on port 8080!"));
