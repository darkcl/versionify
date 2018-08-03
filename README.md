# Versionify

## Usage

### Using with express middleware

```js
import { VersionifyMiddleware } from "versionify-js";

app.use(VersionifyMiddleware("1.0.1", "endpoint-version"));

app.get("/", function(req, res, next) {
  console.log(req.versionify); // Versionify object
});
```

### Create different version files in the same directory

```js
// `/functions/func.1.0.0.js
exports.hello = function() {
  return "hello 1.0.0";
};

// `/functions/func.1.0.1.js
exports.hello = function() {
  return "hello 1.0.1";
};
```

### To use the `Versionify` class in a TypeScript file

```ts
import { Versionify } from "versionify-js";

const versionify = new Versionify("1.0.0");
const funcV1: Function = versionify.invoke(
  join(__dirname, "./functions"),
  "func",
  "hello"
);
console.log(funcV1()); // hello 1.0.0

const versionify2 = new Versionify("1.0.1");
const funcV101: Function = versionify2.invoke(
  join(__dirname, "./functions"),
  "func",
  "hello"
);
console.log(funcV101()); // hello 1.0.1
```

### To use the `Versionify` class in a JavaScript file

```js
const versionify = new Versionify("1.0.0");
const funcV1 = versionify.invoke(
  join(__dirname, "./functions"),
  "func",
  "hello"
);
console.log(funcV1()); // hello 1.0.0

const versionify2 = new Versionify("1.0.1");
const funcV101 = versionify2.invoke(
  join(__dirname, "./functions"),
  "func",
  "hello"
);
console.log(funcV101()); // hello 1.0.1
```
