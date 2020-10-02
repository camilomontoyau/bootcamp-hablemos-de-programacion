const express = require("express");
const app = express();
const router = express.Router();

app.get("/", (req, res) => {
  res.write("hello world");
  res.end();
});

app.get("/tom", (req, res) => {
  res.write("hello tom");
  res.end();
});

app.get("/:name(\\w{3})", (req, res) => {
  var name = req.params.name;
  res.write("hello " + name);
  res.end();
});

router.get("/profile", (req, res) => {
  res.write("profile");
  res.end();
});

router.get("/status", (req, res) => {
  res.write("active");
  res.end();
});

app.use("/user", router);

app.listen(4000);
