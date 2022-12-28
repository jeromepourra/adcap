const express = require("express");
const router = express.Router();
const Player = require("./../game/Player");
const Handler = require("./../game/request/Handler");

let player = new Player();

router.get("/", function(req, res) {
    res.render("index", {player: player});
});

router.post("/", function(req, res) {
    let handler = new Handler(req.body);
    let response = handler.dispatch(player);
    res.send(response);
});

module.exports = router;