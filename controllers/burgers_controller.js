//Require Express and import models to use its database functions
var express = require("express");
var router = express.Router();
var db = require("../models");

//Create routes
//Show all data in database
router.get("/", function(req, res){
	db.Burger.findAll().then(function(results){
		res.render("index", {burgers: results});
	});
});
//Add an entry to database
router.post("/", function(req, res){
	db.Burger.create({
		burger_name: req.body.name,
		devoured: req.body.devoured
	}).then(function(results){
		res.redirect("/");
	});
});
//Update boolean status in database
router.put("/:id", function(req, res){
	db.Burger.update({
			devoured: true
	}, {
		where: {
			id: req.params.id
		}
	}).then(function(results){
		res.redirect("/");
	})
});

//Export routes for server.js to use
module.exports = router;