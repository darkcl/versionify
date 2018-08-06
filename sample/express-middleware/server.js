const express = require("express");

const app = express();

const { versioning } = require("versionify-js");

app.use(versioning("1.0.0", "endpoint-version"));

app.get("/", (req, res) =>
  res.send(`Request require api version ${req.versionify["version"]}`)
);

app.listen(8080, () => console.log("Example app listening on port 8080!"));
