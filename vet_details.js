module.exports = function(){
    var express = require('express');
    var router = express.Router();


    function getDetails(dog_id, res, mysql, context, complete){
	var sql ="SELECT dog_id, dog_name,  DATE_FORMAT(birth_date, '%M %d %Y') AS birth_date , gender, breed, color, weight, availability, shelter.shelter_name, availability FROM dogs INNER JOIN shelter ON dogs.shelter_id=shelter.shelter_id WHERE dog_id = ?";
	var inserts = [dog_id];
	sql = mysql.pool.query(sql, inserts, function(error, results, fields){
            if(error){
                res.write(JSON.stringify(error));
                res.end();
            }
            context.dog_list  = results;
            complete();
        });
    }

    function getDogVaccines(dog_id, res, mysql, context, complete){
	var sql = "SELECT vaccinations.vaccine_name, DATE_FORMAT(vaccination_dates.vaccination_date, '%M %d %Y') AS vaccination_date FROM vaccination_dates INNER JOIN vaccinations ON vaccinations.vaccination_id=vaccination_dates.vaccination_id INNER JOIN dogs ON dogs.dog_id=vaccination_dates.dog_id WHERE vaccination_dates.dog_id=?";
	var inserts = [dog_id];
	sql = mysql.pool.query(sql, inserts, function(error, results, fields){
            if(error){
                res.write(JSON.stringify(error));
                res.end();
            }
            context.vaccination_list  = results;
            complete();
        });
	
    }

    function getAllVaccines(res, mysql, context, complete){
	mysql.pool.query("SELECT vaccination_id, vaccine_name FROM vaccinations;", function(error, results, fields){
            if(error){
                res.write(JSON.stringify(error));
                res.end();
            }
            context.full_vaccination_list  = results;
            complete();
        });
	
    }

	
    router.get('/', function (req, res){
        var callbackCount = 0;
        var context = {};
        //context.jsscripts = ["deleteperson.js","filterpeople.js","searchpeople.js"];
        var mysql = req.app.get('mysql');
	context.dog_id = req.query.dog_id;
        getDetails(context.dog_id, res, mysql, context, complete);
	getDogVaccines(req.query.dog_id, res, mysql, context, complete);
	getAllVaccines(res, mysql, context, complete);
        function complete(){
            callbackCount++;
            if(callbackCount >= 3){
                res.render('dog_details', context);
            }

        }
    });
	
    router.post('/', function(req, res){
        console.log(req.body)
        var mysql = req.app.get('mysql');
        var sql = "INSERT INTO vaccination_dates(vaccination_date, dog_id, vaccination_id) VALUES  (?,?,?)";
        var inserts = [req.body.vaccination_date, req.query.dog_id, req.body.vaccination_id];
        sql = mysql.pool.query(sql,inserts,function(error, results, fields){
            if(error){
                console.log(JSON.stringify(error))
                res.write(JSON.stringify(error));
                res.end();
            }else{
                res.redirect('/dog_details?dog_id='+ req.query.dog_id);
            }
        });
    });


/* this is supposed to update the dog details 3-8-2019*/
    router.put('/:id', function(req, res){
        var mysql = req.app.get('mysql');
        console.log(req.body)
        console.log(req.params.id)
        var sql = "UPDATE dogs SET dog_name=?, birth_date=?, gender=?, breed=?, color=?, weight=? WHERE dog_id=?";
        var inserts = [req.body.dog_name, req.body.birth_date, req.body.dog_gender, req.body.dog_breed, req.body.dog_color, req.body.dog_weight, req.params.id];
        sql = mysql.pool.query(sql,inserts,function(error, results, fields){
            if(error){
                console.log(error)
                res.write(JSON.stringify(error));
                res.end();
            }else{
                res.status(200);
                res.end();
            }            
        });
    });


    return router;
}();




