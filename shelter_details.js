module.exports = function(){
    var express = require('express');
    var router = express.Router();


    function getDetails(shelter_id, res, mysql, context, complete){
	var sql ="SELECT shelter_id, shelter_name, address, city, state, zip_code, phone_number, email FROM shelter WHERE shelter_id=?";
	var inserts = [shelter_id];
	sql = mysql.pool.query(sql, inserts, function(error, results, fields){
            if(error){
                res.write(JSON.stringify(error));
                res.end();
            }
            context.shelter_list = results[0];
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
/*
    function getAllVaccines(res, mysql, context, complete){
	mysql.pool.query("SELECT vaccination_id, vaccine_name FROM vaccinations;", function(error, results, fields){
            if(error){
                res.write(JSON.stringify(error));
                res.end();
            }
            context.full_vaccination_list  = results;
            complete();
        });
	
    }*/

// main dog details page function
// an individual dogs details, shelter they are at and vaccines they have	
    router.get('/', function (req, res){
        var callbackCount = 0;
        var context = {};
        var mysql = req.app.get('mysql');
	    context.shelter_id = req.query.shelter_id;
        getDetails(context.shelter_id, res, mysql, context, complete);
	    getShelterNames(res, mysql, context, complete);
	    //getDogVaccines(req.query.dog_id, res, mysql, context, complete);
	    //getAllVaccines(res, mysql, context, complete);
	    //getDogOwners(req.query.dog_id, res, mysql, context, complete);
        function complete(){
            callbackCount++;
            if(callbackCount >= 2){
                res.render('shelter_details', context);
            }

        }
    });
	/*
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
                res.redirect('/shelter_details?shelter_id='+ req.query.shelter_id);
            }
        });
    });*/


// this updates the shelter details
    router.put('/:id', function(req, res){
        var mysql = req.app.get('mysql');
        console.log(req.body)
        console.log(req.params.id)
        var sql = "UPDATE shelter SET shelter_name=?, address=?, city=?, state=?, zip_code=?, phone_number=?, email=? WHERE shelter_id=?";
        var inserts = [req.body.shelter_name, req.body.shelter_address, req.body.shelter_city, req.body.shelter_state, req.body.shelter_zip_code, req.body.shelter_phone_number, req.body.shelter_email, req.params.id];
        sql = mysql.pool.query(sql,inserts,function(error, results, fields){
            if(error){
                console.log(error)
                res.write(JSON.stringify(error));
                res.end();
            }else{
                res.status(200);
                res.end();
            }            
        })
    })


    return router;
}();




