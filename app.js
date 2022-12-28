const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const gameRoutes = require("./routes/game");

const ADDRESS = new function() {
    this.HOST = "localhost";
    this.PORT = 3000;
    this.URL = `http://${this.HOST}:${this.PORT}`;
}

app.use(express.urlencoded({extended:true}));
app.use("/public", express.static(path.join(__dirname, "public")));
app.set("views", "./views");
app.set("view engine", "ejs");

app.use("/game", gameRoutes);

app.get("/connection", function(req, res) {
    res.sendFile(path.join(__dirname, "views/connection.html"));
});

app.post("/connection", function(req, res) {
    res.send(req.body);
});

app.all("/*", function(req, res) {
    res.render("404");
});

// LISTEN
app.listen(ADDRESS.PORT, ADDRESS.HOST, function() {
    console.log(`Server listening on ${ADDRESS.URL}`);
});
