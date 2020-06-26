// Dependencies
// =============================================================
var express = require('express');
var path = require('path');
// Sets up the Express App
// =============================================================
var app = express();
var PORT = process.env.PORT || 3000;
// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

var tableList = [];
var waitList = [];

app.get('/', function(req, res) {
	res.sendFile(path.join(__dirname, 'home.html'));
});
app.get('/tables', function(req, res) {
	res.sendFile(path.join(__dirname, 'tables.html'));
});

app.get('/reserve', function(req, res) {
	res.sendFile(path.join(__dirname, 'reserve.html'));
});

app.get('/api/tables', function(req, res) {
	return res.json(tableList);
});

app.get('/api/waitlist', function(req, res) {
	return res.json(waitList);
});

app.post('/api/clear', function(req, res) {
	waitList = [];
	tableList = [];
	res.end();
});

app.post('/api/tables', function(req, res) {
	var newTable = req.body;
	console.log(newTable);
	if (tableList.length < 5) {
		tableList.push(newTable);
		return res.json(true);
	} else {
		waitList.push(newTable);
		return res.json(false);
	}
});

// Starts the serves to begin listening
// =============================================================
app.listen(PORT, function() {
	console.log('App listening on PORT ' + PORT);
});

//NPM Install Added - 7:26PM
