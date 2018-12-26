const http       = require("http");
const express    = require('express');
const mysql      = require('mysql2');
const bodyParser = require('body-parser');
const todoNote   = require('./routes/todoNode');
const path       = require('path');

const app        = express();

//start mysql connection
const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "todonode"
});

// defining where my views are
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

connection.connect(function(err) {
  if (err) throw err;
  console.log('You are now connected with mysql database...')
});
//end mysql connection


//start body-parser configuration
app.use(bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({    // to support URL-encoded bodies
  extended: true
}));
//end body-parser configuration

//use router
app.use(todoNote);

//create app server
const server = app.listen(10987);

//rest api to get all tasks
app.get('/api/tasks', function (req, res) {
   connection.query('select * from tasks', function (error, results, fields) {
	  if (error) throw error;
	  res.end(JSON.stringify(results));
	});
});

//rest api to get a single task
app.get('/api/task/:id', function (req, res) {
   connection.query('select * from tasks where id=?', [req.params.id], function (error, results, fields) {
	  if (error) throw error;
	  res.end(JSON.stringify(results));
	});
});

//rest api to create a new task record into mysql database
app.post('/api/task', function (req, res) {
   let params  = req.body;
   console.log(params);
   connection.query('INSERT INTO tasks SET ?', params, function (error, results, fields) {
	  if (error) throw error;
	  res.end(JSON.stringify(results));
	});
});

//rest api to update task record into mysql database
app.put('/api/task', function (req, res) {
   connection.query('UPDATE `tasks` SET `title`=? where `id`=?', [req.body.title,req.body.id], function (error, results, fields) {
	  if (error) throw error;
	  res.end(JSON.stringify(results));
	});
});

//rest api to delete record from mysql database
app.delete('/api/task', function (req, res) {
   connection.query('DELETE FROM `tasks` WHERE `id`=?', [req.body.id], function (error, results, fields) {
	  if (error) throw error;
	  res.end('Record has been deleted!');
	});
});

//rest api to get all customers
// app.get('/', function (req, res) {
//     res.send('<h1>Add Task</h1>' + '<form action="/task" method="post">\n' +
//         '    <input type="text" name="title">\n' +
//         '    <button type="submit">Add task</button>\n' +
//         '</form>');
// });

