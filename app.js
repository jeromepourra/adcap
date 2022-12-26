const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");
const Player = require("./game/Player");
const Handler = require("./request/handler");
const app = express();

const ADDRESS = new function() {
    this.HOST = "localhost";
    this.PORT = 3000;
    this.URL = `http://${this.HOST}:${this.PORT}`;
}

let player = new Player();

app.use(bodyParser.urlencoded({extended: true}));
app.use("/public", express.static(path.join(__dirname, "public")));
app.set("views", "./views");
app.set("view engine", "ejs");

app.get("/", function(req, res) {
    res.render("index", {player: player});
});

app.post("/", function(req, res) {
    let handler = new Handler(req.body);
    let response = handler.dispatch(player);
    res.send(response);
});

app.all("/*", function(req, res) {
    res.render("404");
});

// LISTEN
app.listen(ADDRESS.PORT, ADDRESS.HOST, function() {
    console.log(`Server listening on ${ADDRESS.URL}`);
});
