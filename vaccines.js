module.exports = function(){
    var express = require('express');
    var router = express.Router();


    function getVaccines(res, mysql, context, complete){
        mysql.pool.query("SELECT vaccination_id, vaccine_name FROM vaccinations;", function(error, results, fields){
            if(error){
                res.write(JSON.stringify(error));
                res.end();
            }
            context.vaccines  = results;
            complete();
        });
    }
	// display vaccines 
    router.get('/', function(req, res){
        var callbackCount = 0;
        var context = {};
        context.jsscripts = ["deletevaccine.js"];
		//context.jsscripts = ["deleteperson.js","filterpeople.js","searchpeople.js"];
        var mysql = req.app.get('mysql');
        getVaccines(res, mysql, context, complete);
        function complete(){
            callbackCount++;
            if(callbackCount >= 1){
                res.render('vaccines', context);
            }

        }
    });
	// add new vaccine to database 
    router.post('/', function(req, res){
        console.log(req.body)
        var mysql = req.app.get('mysql');
        var sql = "INSERT INTO vaccinations (vaccine_name) VALUES (?)";
        var inserts = [req.body.vacc_name];
        sql = mysql.pool.query(sql,inserts,function(error, results, fields){
            if(error){
                console.log(JSON.stringify(error))
                res.write(JSON.stringify(error));
                res.end();
            }else{
                res.redirect('/vaccines');
            }
        });
    });
	
	// this updates the vaccine
    router.put('/:id', function(req, res){
        var mysql = req.app.get('mysql');
        console.log(req.body)
        console.log(req.params.id)
		//var x = document.getElementById("vacc_value");
        //var sql = "UPDATE vaccinations SET vacc_name=? WHERE vaccination_id='" + x+ "'";
		var sql = "UPDATE vaccinations SET vaccine_name=? WHERE vaccination_id=?";
        var inserts = [req.body.vaccine_name, req.params.id];
		
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
	
		
	/* Route to delete a vaccine, simply returns a 202 upon success. Ajax will handle this. */
    router.delete('/:id', function(req, res){
        var mysql = req.app.get('mysql');
        var sql = "DELETE FROM vaccinations WHERE vaccination_id=?";
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
