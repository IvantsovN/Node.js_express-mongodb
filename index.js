
var express = require('express');
var bodyParser = require('body-parser');


var app = express(); // сервер

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : true}));

var people = [
	{
		id : 1,
		name : 'Niki'
	},
	{
		id : 2,
		name : 'Ilya'
	}
];


app.get('/', function(req , res) {
	res.send('Hello, World');
});

app.get('/people', function(req, res) {
	res.send(people);
});

app.post('/people', function(req, res) {
	var p  = {
		id : Date.now(),
		name : req.body.name
	};
	people.push(p);
	console.log(req.body);
	res.send(people);
});

app.get('/people/:id', function(req, res){
	var man, find = false;
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
	}
});

app.listen('3000', function() {
	console.log('Port : 3000');
});