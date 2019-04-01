module.exports = function(){
    var express = require('express');
    var router = express.Router();

    function getShelters(res, mysql, context, complete){
        mysql.pool.query("SELECT shelter_id, shelter_name, address, city, state, zip_code, phone_number, email FROM shelter;", function(error, results, fields){
            if(error){
                res.write(JSON.stringify(error));
                res.end();
            }
            context.shelter_list  = results;
            complete();
        });
    }

    router.get('/', function(req, res){
        var callbackCount = 0;
        var context = {};
        //context.jsscripts = ["deletevaccine.js"];
		//context.jsscripts = ["deleteperson.js","filterpeople.js","searchpeople.js"];
        var mysql = req.app.get('mysql');
        getShelters(res, mysql, context, complete);
        function complete(){
            callbackCount++;
            if(callbackCount >= 1){
                res.render('shelters', context);
            }

        }
    });
	
	router.post('/', function(req, res){
        console.log(req.body)
        var mysql = req.app.get('mysql');
        var sql = "INSERT INTO shelter (shelter_name, address, city, state, zip_code, phone_number, email) VALUES (?,?,?,?,?,?,?)";
        var inserts = [req.body.shelter_name, req.body.address, req.body.city, req.body.state, req.body.zip_code, req.body.phone_number, req.body.email];
        sql = mysql.pool.query(sql,inserts,function(error, results, fields){
            if(error){
                console.log(JSON.stringify(error))
                res.write(JSON.stringify(error));
                res.end();
            }else{
                res.redirect('/shelters');
            }
        });
    });
	

    return router;
}();
