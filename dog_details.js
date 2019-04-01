module.exports = function(){
    var express = require('express');
    var router = express.Router();


    function getDetails(dog_id, res, mysql, context, complete){
	var sql ="SELECT dog_id, dog_name,  DATE_FORMAT(birth_date, '%Y-%m-%d') AS birth_date , gender, breed, color, weight, availability, shelter.shelter_name, dogs.shelter_id AS shelter_id, availability FROM dogs INNER JOIN shelter ON dogs.shelter_id=shelter.shelter_id WHERE dog_id = ?";
	var inserts = [dog_id];
	sql = mysql.pool.query(sql, inserts, function(error, results, fields){
            if(error){
                res.write(JSON.stringify(error));
                res.end();
            }
            context.dog_list  = results[0];
            complete();
        });
    }

    function getShelterNames(res, mysql, context, complete) {
	mysql.pool.query("SELECT shelter_id, shelter_name FROM shelter;", function(error, results, fields){
	    if(error){
		res.write(JSON.stringify(error));
		res.end();
            }
	    context.shelter = results;
	    complete();
        });
    }
// shows a dogs vaccine records  
    function getDogVaccines(dog_id, res, mysql, context, complete){
	var sql = 
	    "SELECT dates_id, vaccination_dates.dog_id, vaccinations.vaccine_name, DATE_FORMAT(vaccination_dates.vaccination_date, '%M %d %Y') AS vaccination_date " + 
            "FROM vaccination_dates " +
            "INNER JOIN vaccinations ON vaccinations.vaccination_id=vaccination_dates.vaccination_id " +
            "INNER JOIN dogs ON dogs.dog_id=vaccination_dates.dog_id " +
            "WHERE vaccination_dates.dog_id=?;";
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
 // shows a dogs owners
    function getDogOwners(dog_id, res, mysql, context, complete){
	var sql = 
	    "SELECT dog_owners.owner_id, owner.first_name, owner.last_name, DATE_FORMAT(dog_owners.adoption_date, '%M %d %Y') AS adoption_date " +
            "FROM dog_owners " +
            "INNER JOIN owner ON owner.owner_id=dog_owners.owner_id " +
            "WHERE dog_owners.dog_id=?";
	var inserts = [dog_id];
	sql = mysql.pool.query(sql, inserts, function(error, results, fields){
            if(error){
                res.write(JSON.stringify(error));
                res.end();
            }
            context.dog_owner_list  = results;
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

// main dog details page function
// an individual dogs details, shelter they are at and vaccines they have	
    router.get('/', function (req, res){
        var callbackCount = 0;
        var context = {};
        var mysql = req.app.get('mysql');
	    context.dog_id = req.query.dog_id;
        getDetails(context.dog_id, res, mysql, context, complete);
	    getShelterNames(res, mysql, context, complete);
	    getDogVaccines(req.query.dog_id, res, mysql, context, complete);
	    getAllVaccines(res, mysql, context, complete);
	    getDogOwners(req.query.dog_id, res, mysql, context, complete);
        function complete(){
            callbackCount++;
            if(callbackCount >= 5){
                res.render('dog_details', context);
            }

        }
    });
// insert new vaccine dates for a dog	
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


// this updates the dog details
    router.put('/:id', function(req, res){
        var mysql = req.app.get('mysql');
        console.log(req.body)
        console.log(req.params.id)
        var sql = "UPDATE dogs SET dog_name=?, birth_date=?, gender=?, breed=?, color=?, weight=?, shelter_id=?, availability=? WHERE dog_id=?";
        var inserts = [req.body.dog_name, req.body.birth_date, req.body.dog_gender, req.body.dog_breed, req.body.dog_color, req.body.dog_weight, req.body.dog_shelter, req.body.dog_availability, req.params.id];
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
	
	// deletes individual vaccine record of dog 
	 router.delete('/:id', function(req, res){
        var mysql = req.app.get('mysql');
        var sql = "DELETE FROM vaccination_dates WHERE dates_id=?";
        var inserts = [req.params.id];
        sql = mysql.pool.query(sql, inserts, function(error, results, fields){
            if(error){
				//console.log(error)
                res.write(JSON.stringify(error));
                res.status(400);
                res.end();
            }else{
				console.log(sql)
                res.status(202).end();
            }
        })
    })	


    return router;
}();




