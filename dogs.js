module.exports = function(){
    var express = require('express');
    var router = express.Router();


    function getDogs(res, mysql, context, complete){
        mysql.pool.query("SELECT dog_id,dog_name, DATE_FORMAT(birth_date, '%M %d %Y') AS birth_date, gender, breed, color, weight, availability, shelter.shelter_name, availability FROM dogs INNER JOIN shelter ON dogs.shelter_id=shelter.shelter_id;", function(error, results, fields){
            if(error){
                res.write(JSON.stringify(error));
                res.end();
            }
            context.dog_list  = results;
            complete();
        });
    }

    function getDogsFiltered(res, mysql, context, complete){	     
	var sql = "SELECT dog_id,dog_name, DATE_FORMAT(birth_date, '%M %d %Y') AS birth_date, gender, breed, color, weight, availability, shelter.shelter_name FROM dogs INNER JOIN shelter ON dogs.shelter_id=shelter.shelter_id WHERE dogs.shelter_id " ;
	if (context.shelter_id_submitted == '%') {
	    sql += "LIKE '%'";
	}
	else {
	    sql += "=?";
	}
	var inserts = [context.shelter_id_submitted];
	var useAND = true;
	if (context.coming_soon_submitted == "checked")
	{
	    if (useAND) {
		sql += " AND ( availability='comingsoon'";
		useAND = false;
	    }
	    else {
		sql += " OR availability='comingsoon'";
	    }
	}
	if (context.adoptable_submitted == "checked")
	{
	    if (useAND) {
		sql += " AND ( availability='adoptable'";
		useAND = false;
	    }
	    else {
		sql += " OR availability='adoptable'";
	    }
	}

	if (context.adopted_submitted == "checked")
	{
	    if (useAND) {
		sql += " AND ( availability='adopted'";
		useAND = false;
	    }
	    else {
		sql += " OR availability='adopted'";
	    }
	}
	// See if all boxes are unchecked
	if  ((context.coming_soon_submitted != "checked") &&
	     (context.adoptable_submitted != "checked") &&
	     (context.adopted_submitted != "checked")) {
	    // return nothing
	    sql += " AND availability='zero'";
	}

	if (useAND == false) {
	    sql += ")";
	}
        mysql.pool.query(sql,inserts, function(error, results, fields){
            if(error){
                res.write(JSON.stringify(error));
                res.end();
            }
            context.dog_list  = results;
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
	
    router.get('/', function(req, res){
        var callbackCount = 0;
        var context = {};
        var mysql = req.app.get('mysql');
        getShelterNames(res, mysql, context, complete);

	var i = 0;
	for (const key in req.query) {
	    ++i;
	}
	if (i != 0) {
	    // filter request
	    context.shelter_id_submitted = req.query.dog_shelter;
	    context.coming_soon_submitted = req.query.comingsoon_checkbox;
	    context.adoptable_submitted = req.query.adoptable_checkbox;
	    context.adopted_submitted = req.query.adopted_checkbox;
	    getDogsFiltered(res, mysql, context, complete);

	}
	else
	{
	    context.shelter_id_submitted = '*';
	    context.coming_soon_submitted = 'checked';
	    context.adoptable_submitted = 'checked';
	    context.adopted_submitted = 'checked';
	    getDogs(res, mysql, context, complete);
	}

        function complete(){
            callbackCount++;
            if(callbackCount >= 2){
                res.render('dogs', context);
            }

        }
    });
	
    router.post('/', function(req, res){
        console.log(req.body)
        var mysql = req.app.get('mysql');
        var sql = "INSERT INTO dogs (dog_name, birth_date, gender, breed, color, weight, availability, shelter_id, owner_id) VALUES (?,?,?,?,?,?,?,?,1)";
        var inserts = [req.body.dog_name, req.body.birth_date, req.body.gender, req.body.breed, req.body.color, req.body.weight, req.body.availability, req.body.shelter_id];
        sql = mysql.pool.query(sql,inserts,function(error, results, fields){
            if(error){
                console.log(JSON.stringify(error))
                res.write(JSON.stringify(error));
                res.end();
            }else{
                res.redirect('/dogs');
            }
        });
    });

    return router;
}();




