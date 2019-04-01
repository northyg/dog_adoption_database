module.exports = function(){
    var express = require('express');
    var router = express.Router();


    function getOwnerDetails(owner_id, res, mysql, context, complete){
	var sql ="SELECT owner.owner_id, first_name, last_name, address, city, state, zip_code, phone_number, email FROM owner WHERE owner.owner_id = ?";
	var inserts = [owner_id];
	sql = mysql.pool.query(sql, inserts, function(error, results, fields){
            if(error){
                res.write(JSON.stringify(error));
                res.end();
            }
            context.owner_list  = results[0];
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
// shows a dogs this owner has 
    function getOwnersDogs(owner_id, res, mysql, context, complete){
	var sql = 
	    "SELECT dogs.dog_id, dogs.dog_name, DATE_FORMAT(dog_owners.adoption_date, '%M %d %Y') AS adoption_date " + 
            "FROM dog_owners " +
            "INNER JOIN dogs ON dogs.dog_id=dog_owners.dog_id " +
            "WHERE dog_owners.owner_id=?;";
	var inserts = [owner_id];
	sql = mysql.pool.query(sql, inserts, function(error, results, fields){
            if(error){
                res.write(JSON.stringify(error));
                res.end();
            }
            context.dogs_owned_list  = results;
            complete();
        });
	
    }

    function getAllDogs(res, mysql, context, complete){
	mysql.pool.query("SELECT dogs.dog_id, dogs.dog_name, shelter.shelter_name FROM dogs INNER JOIN shelter ON dogs.shelter_id=shelter.shelter_id;", function(error, results, fields){
            if(error){
                res.write(JSON.stringify(error));
                res.end();
            }
            context.full_dog_list  = results;
            complete();
        });
	
    }

// main dog details page function
// an individual dogs details, shelter they are at and vaccines they have	
    router.get('/', function (req, res){
        var callbackCount = 0;
        var context = {};
        var mysql = req.app.get('mysql');
	context.owner_id = req.query.owner_id;
        getOwnerDetails(context.owner_id, res, mysql, context, complete);
	getShelterNames(res, mysql, context, complete);
	getOwnersDogs(req.query.owner_id, res, mysql, context, complete);
	getAllDogs(res, mysql, context, complete);
//	getDogOwners(req.query.dog_id, res, mysql, context, complete);
        function complete(){
            callbackCount++;
            if(callbackCount >= 4){
                res.render('owner_details', context);
            }

        }
    });
// insert new vaccine dates for a dog	
    router.post('/', function(req, res){
        console.log(req.body)
        var mysql = req.app.get('mysql');
        var sql = "INSERT INTO dog_owners(adoption_date, dog_id, owner_id) VALUES  (?,?,?)";
        var inserts = [req.body.adoption_date, req.body.dog_id, req.query.owner_id];
        sql = mysql.pool.query(sql,inserts,function(error, results, fields){
            if(error){
                console.log(JSON.stringify(error))
                res.write(JSON.stringify(error));
                res.end();
            }else{
                res.redirect('/owner_details?owner_id='+ req.query.owner_id);
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


    return router;
}();




