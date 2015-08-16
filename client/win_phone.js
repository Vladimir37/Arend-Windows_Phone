var http = require('http');
var express = require('express');
var mysql = require('mysql');
var parser = require('body-parser');
var db_params = {
	host: 'server',
	user: 'root',
	password: 'password',
	database: 'default'
};

//Возврат результатов
var app = express();
app.use(parser());

app.post('/volz', function(req, res) {
	var db_connect = mysql.createConnection(db_params);
	db_connect.query('SELECT `name`, `description`, `price`, `phone` FROM `object_af` WHERE `arhive` = 0 AND `price` > ' + req.body.min + ' AND `price` < ' + req.body.max + ' AND `obj_type` IN("' + req.body.type + '") ORDER BY `id` ASC LIMIT ' + req.body.num + ', 15', function(err, rows) {
		if(err) {
			console.log(err);
			res.end('Error');
		}
		else {
			var result = JSON.stringify(rows);
			res.writeHead(200, {"Content-Type": "text/html; charset=utf-8", 'Access-Control-Allow-Origin': '*'});
			res.write(result);
			res.end();
		}
	});
});
app.post('/volg', function(req, res) {
	var db_connect = mysql.createConnection(db_params);
	db_connect.query('SELECT `ownerName`, `description`, `price`, `ownerPhone` FROM `rentobject` WHERE `archive` = 0 AND `price` > ' + req.body.min + ' AND `price` < ' + req.body.max + ' AND `objectType` IN("' + req.body.type + '") ORDER BY `id` ASC LIMIT ' + req.body.num + ', 15', function(err, rows) {
		if(err) {
			console.log(err);
			res.end('Error');
		}
		else {
			var result = JSON.stringify(rows);
			res.writeHead(200, {"Content-Type": "text/html; charset=utf-8", 'Access-Control-Allow-Origin': '*'});
			res.write(result);
			res.end();
		}
	});
});

http.createServer(app).listen(90);