const express = require("express");
const app = express();

app.set("view engine", "ejs");
app.set("views", "./views");

app.use(express.static("public"));
app.use(
  "/scripts",
  express.static(__dirname + "/node_modules/web3.js-browser/build/")
);

app.listen(3000);

app.get("/", (req, res) => {
  res.render("master");
});
