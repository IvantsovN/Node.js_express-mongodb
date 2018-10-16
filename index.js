
var express = require('express');
var bodyParser = require('body-parser');
var MongoClient = require('mongodb').MongoClient;
var ObjectID = require('mongodb').ObjectID; 

var app = express(); // сервер
var db;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : true}));

app.get('/', function(req , res) {
	res.send('Hello, World');
});

app.get('/people', function(req, res) {
	//res.send(people);
	db.collection('people1').find().toArray(function(err, docs) {
		if (err) {
			console.log(err);
			return res.sendStatus(500);
		}
		res.send(docs);
	});
});

app.post('/people', function(req, res) {
	var people  = {
		name : req.body.name
	};
	db.collection('people1').insert(people, function(err, result) {
		if (err) {
			console.log(err);
			return res.sendStatus(500);
		}
		res.send(people);
	});
	/*
	people.push(p);
	console.log(req.body);
	res.send(people);
	*/
});

app.get('/people/:id', function(req, res){
	db.collection('people1').findOne({ _id : ObjectID(req.params.id)}, function (err, docs) {
		if (err) {
			console.log(err);
			return res.sendStatus(500);
		}
		else {
			res.send('Hello, ' + docs.name + '\n ID : ' + docs._id);
		}
	});
	/*var man, find = false;
	people.forEach( function(item) {
		if(item.id == req.params.id) {
			man = item;
			find = true;
		} 
	});
	if(find) {
		res.send('Hello, ' + man.name + '\n ID : ' + man.id);

	} 
	else {
		res.send('Пользователя с таким ID не существует');
	}*/
});
	
app.put('/people/:id', function(req, res) {
	db.collection('people1').updateOne(
		{ _id  : ObjectID(req.params.id)},
		{ name : req.body.name },
		function(err, result) {
			if(err) {
				console.log(err);
				return res.sendStatus(500);
			}
			res.sendStatus(200); 
		}
	);
});

app.delete('/people/:id', function(req, res) {
	db.collection('people1').deleteOne(
		{ _id : ObjectID(req.params.id) },
		function(err, result) {
			if(err) {
				console.log(err);
				return res.sendStatus(500);
			}
			res.sendStatus(200);
		}	
	);
});

MongoClient.connect('mongodb://localhost:27017/myapp', function(err, database) {
	if (err) {
		return console.log(err);
	}
	else {
		db = database;
		app.listen('3000', function() {
		console.log('Port : 3000');
		});
	}
	
});

