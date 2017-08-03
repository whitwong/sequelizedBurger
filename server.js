//Require npm modules
var express = require("express");
var bodyParser = require("body-parser");
var methodOverride = require("method-override");
var exphbs = require("express-handlebars");
var db = require("./models")

//Initial Variables
var port = process.env.PORT || 8080;
var app = express();

//Server static content for the app from the "public" directory
app.use(express.static("public"));

//Middleware
app.use(bodyParser.urlencoded({extended: false}));

//Method Override with POST button
app.use(methodOverride("_method"));

//Set Handlebars
app.engine("handlebars", exphbs({defaultLayout: "main"}));
app.set("view engine", "handlebars");

// Import routes and give server access to them
var routes = require("./controllers/burgers_controller.js");
app.use("/", routes);

//Start server
db.sequelize.sync({force: true}).then(function(){
	app.listen(port, function(){
		console.log("Listening on PORT " + port);
	});
});