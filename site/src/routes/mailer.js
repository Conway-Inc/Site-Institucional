var express = require("express");
var router = express.Router();

var mailerController = require("../controllers/mailerController");

router.post("/enviar", function (req, res) {
    mailerController.enviarEmail(req, res);
});



module.exports = router;