/*  
    Uses express, dbcon for database connection, body parser to parse form data 
    handlebars for HTML templates  
*/

var express = require('express');
var mysql = require('./dbcon.js');
var bodyParser = require('body-parser');

var app = express();
var handlebars = require('express-handlebars').create({defaultLayout:'main'});

app.engine('handlebars', handlebars.engine);
app.use(bodyParser.urlencoded({extended:true}));
app.use('/static', express.static('public'));
app.set('view engine', 'handlebars');
app.set('port', process.argv[2]);
app.set('mysql', mysql);
app.use('/owners', require('./owners.js'));
app.use('/owner_details', require('./owner_details.js'));
app.use('/shelters', require('./shelters.js'));
app.use('/vets', require('./vets.js'));
app.use('/vaccines', require('./vaccines.js'));
app.use('/dogs', require('./dogs.js'));
app.use('/dog_details', require('./dog_details.js'));
app.use('/shelter_details', require('./shelter_details.js'));
app.use('/', express.static('public'));

app.use(function(req,res){
  res.status(404);
  res.render('404');
    
});

app.use(function(err, req, res, next){
  console.error(err.stack);
  console.log(err.stack);
  res.status(500);
  res.render('500');
});

app.listen(app.get('port'), function(){
  console.log('Express started on http://localhost:' + app.get('port') + '; press Ctrl-C to terminate.');
});
