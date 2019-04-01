module.exports = function(){
    var express = require('express');
    var router = express.Router();


    function getVets(res, mysql, context, complete){
        mysql.pool.query("SELECT first_name, last_name, address, city, state, zip_code phone_number FROM vet;", function(error, results, fields){
            if(error){
                res.write(JSON.stringify(error));
                res.end();
            }
            context.vets_list  = results;
            complete();
        });
    }
	
    router.get('/', function(req, res){
        var callbackCount = 0;
        var context = {};
        //context.jsscripts = ["deletevaccine.js"];
		//context.jsscripts = ["deleteperson.js","filterpeople.js","searchpeople.js"];
        var mysql = req.app.get('mysql');
        getVets(res, mysql, context, complete);
        function complete(){
            callbackCount++;
            if(callbackCount >= 1){
                res.render('vets', context);
            }

        }
    });
	
    router.post('/', function(req, res){
        console.log(req.body)
        var mysql = req.app.get('mysql');
        var sql = "INSERT INTO vet (first_name, last_name, address, city, state, zip_code, phone_number, shelter_id) VALUES (?,?,?,?,?,?,?,1)";
        var inserts = [req.body.first_name, req.body.last_name, req.body.address, req.body.city, req.body.state, req.body.zip_code, req.body.phone_number];
        sql = mysql.pool.query(sql,inserts,function(error, results, fields){
            if(error){
                console.log(JSON.stringify(error))
                res.write(JSON.stringify(error));
                res.end();
            }else{
                res.redirect('/vets');
            }
        });
    });
	
	
	/* Route to delete a vaccine, simply returns a 202 upon success. Ajax will handle this. */
    router.delete('/', function(req, res){
        var mysql = req.app.get('mysql');
        var sql = "DELETE FROM vet WHERE vet_id = ?";
        var inserts = [req.params.id];
        sql = mysql.pool.query(sql, inserts, function(error, results, fields){
            if(error){
                res.write(JSON.stringify(error));
                res.status(400);
                res.end();
            }else{
                res.status(202).end();
            }
        })
    })

    return router;
}();
