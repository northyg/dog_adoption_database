-- Giselle Northy
-- DMQ snippets


-- Insert new dogs/shelters/owners/etc. into their tables

INSERT INTO dogs (dog_name, birth_date, gender, breed, color, weight, availability, shelter_id, owner_id) 
	VALUES 
	(	:dog_nameInput, 
		:birth_dateInput, 
		:genderInput, 
		:breedInput, 
		:colorInput, 
		:weightInput, 
		:availabilityInput, 
		:shelter_idInput, 
		:owner_idInput
	);

INSERT INTO shelter (shelter_name, address, city, state, zip_code, phone_number, email) 
	VALUES 
	(	:shelter_nameInput, 
		:addressInput, 
		:cityInput, 
		:stateInput,
		:zip_code, 
		:phone_number, 
		:email
	);
	
INSERT INTO owner (first_name, last_name, address, city, state, zip_code, phone_number, email) 
	VALUES 
	(	:first_nameInput,
		:last_nameInput,
		:addressInput, 
		:cityInput, 
		:stateInput,
		:zip_codeInput, 
		:phone_numberInput, 
		:emailInput
	);
	
INSERT INTO dog_owners (adoption_date, dog_id, owner_id) 
	VALUES 
	(	:adoption_date,
		:dog_idInput,
		:owner_idInput
	);	

	
INSERT INTO vet (first_name, last_name, address, city, state, zip_code, phone_number, shelter_id) 
	VALUES 
	(	:first_nameInput,
		:last_nameInput,
		:addressInput, 
		:cityInput, 
		:stateInput,
		:zip_codeInput, 
		:phone_numberInput, 
		:shelter_idInput
	);
	
INSERT INTO vaccinations (vaccine_name) 
	VALUES 
	(	:vaccine_nameInput);
	
INSERT INTO vaccination_dates (dog_id, vaccination_id) 
	VALUES 
	(	:vaccination_idInput,
		:dog_idInput
	);
	
	
-- Update Dog Adoption Status 
UPDATE dogs SET availability = :availabilityInput 
	WHERE dog_id = :dog_ID_from_the_update_form

-- Dog was adopted by an owner, leaves the shelter
UPDATE dogs SET owner_id = :owner_idInput, shelter_id = NULL
	WHERE dog_id = :dog_ID_from_the_update_form
	

-- get all Dog IDs and Names

SELECT dog_name, birth_date, gender, breed, color, weight, availability FROM dogs;

SELECT first_name, last_name, address, city, state, zip_code phone_number, email FROM owner;

SELECT adoption_date, dog_id, owner_id FROM dog_owners;

SELECT shelter_name, address, city, state, zip_code phone_number, email FROM shelter;

SELECT vet first_name, last_name, address, city, state, zip_code phone_number FROM vet;

SELECT vaccine_name FROM vaccinations;


-- Delete owner from table using input ID, and in dog_owners table if exists there
DELETE FROM owner WHERE owner_id = :owner_ID_from_the_delete_form

DELETE FROM dog_owners WHERE owner_id = :owner_ID_from_the_delete_form

-- Delete shelter from table using input ID
DELETE FROM shelter WHERE shelter_id = :shelter_ID_from_the_delete_form
	
    
-- DMQ SNIPPETS FROM OUR WEBSITE FILES --
    
-- Update dog details

        var sql = "UPDATE dogs SET dog_name=?, birth_date=?, gender=?, breed=?, color=?, weight=? WHERE dog_id=?";
        var inserts = [req.body.dog_name, req.body.birth_date, req.body.dog_gender, req.body.dog_breed, req.body.dog_color, req.body.dog_weight, req.params.id];
        
-- Get dog details

		var sql ="SELECT dog_id, dog_name,  DATE_FORMAT(birth_date, '%Y-%m-%d') AS birth_date , gender, breed, color, weight, availability, shelter.shelter_name, dogs.shelter_id AS shelter_id, availability FROM dogs INNER JOIN shelter ON dogs.shelter_id=shelter.shelter_id WHERE dog_id = ?";
		var inserts = [dog_id];

-- get shelter names
("SELECT shelter_id, shelter_name FROM shelter;", function(error, results, fields)

-- get dog vaccines

	var sql = 
	    "SELECT dates_id, vaccination_dates.dog_id, vaccinations.vaccine_name, DATE_FORMAT(vaccination_dates.vaccination_date, '%M %d %Y') AS vaccination_date " + 
            "FROM vaccination_dates " +
            "INNER JOIN vaccinations ON vaccinations.vaccination_id=vaccination_dates.vaccination_id " +
            "INNER JOIN dogs ON dogs.dog_id=vaccination_dates.dog_id " +
            "WHERE vaccination_dates.dog_id=?;";
		var inserts = [dog_id];

-- get dog owners

	    "SELECT dog_owners.owner_id, owner.first_name, owner.last_name, DATE_FORMAT(dog_owners.adoption_date, '%M %d %Y') AS adoption_date " +
            "FROM dog_owners " +
            "INNER JOIN owner ON owner.owner_id=dog_owners.owner_id " +
            "WHERE dog_owners.dog_id=?";
		var inserts = [dog_id];

-- get all vaccines

mysql.pool.query("SELECT vaccination_id, vaccine_name FROM vaccinations;", function(error, results, fields)

-- insert new vaccine dates for a dog

        var sql = "INSERT INTO vaccination_dates(vaccination_date, dog_id, vaccination_id) VALUES  (?,?,?)";
		var inserts = [req.body.vaccination_date, req.query.dog_id, req.body.vaccination_id];

-- update dog details

		var sql = "UPDATE dogs SET dog_name=?, birth_date=?, gender=?, breed=?, color=?, weight=?, shelter_id=?, availability=? WHERE dog_id=?";
		var inserts = [req.body.dog_name, req.body.birth_date, req.body.dog_gender, req.body.dog_breed, req.body.dog_color, req.body.dog_weight, req.body.dog_shelter, req.body.dog_availability, req.params.id];

-- delete vaccine record of a dog
        var mysql = req.app.get('mysql');
        var sql = "DELETE FROM vaccination_dates WHERE dates_id=?";
		var inserts = [req.params.id];
        
-- get dogs

 mysql.pool.query("SELECT dog_id,dog_name, DATE_FORMAT(birth_date, '%M %d %Y') AS birth_date, gender, breed, color, weight, availability, shelter.shelter_name, availability FROM dogs INNER JOIN shelter ON dogs.shelter_id=shelter.shelter_id;", function(error, results, fields){
 
-- get dogs filtered
 
		var sql = "SELECT dog_id,dog_name, DATE_FORMAT(birth_date, '%M %d %Y') AS birth_date, gender, breed, color, weight, availability, shelter.shelter_name FROM dogs INNER JOIN shelter ON dogs.shelter_id=shelter.shelter_id WHERE dogs.shelter_id " ;
		if (context.shelter_id_submitted == '%') {

-- get shelter names
		mysql.pool.query("SELECT shelter_id, shelter_name FROM shelter;", function(error, results, fields){
    
-- insert data into dogs
		var mysql = req.app.get('mysql');
        var sql = "INSERT INTO dogs (dog_name, birth_date, gender, breed, color, weight, availability, shelter_id, owner_id) VALUES (?,?,?,?,?,?,?,?,1)";
        var inserts = [req.body.dog_name, req.body.birth_date, req.body.gender, req.body.breed, req.body.color, req.body.weight, req.body.availability, req.body.shelter_id];
        sql = mysql.pool.query(sql,inserts,function(error, results, fields)


-- get owner details
		var sql ="SELECT owner.owner_id, first_name, last_name, address, city, state, zip_code, phone_number, email FROM owner WHERE owner.owner_id = ?";
		var inserts = [owner_id];

-- get shelter names
	mysql.pool.query("SELECT shelter_id, shelter_name FROM shelter;", function(error, results, fields){
    
-- get owners dogs
    
    	var sql = 
	    "SELECT dogs.dog_id, dogs.dog_name, DATE_FORMAT(dog_owners.adoption_date, '%M %d %Y') AS adoption_date " + 
            "FROM dog_owners " +
			"INNER JOIN dogs ON dogs.dog_id=dog_owners.dog_id " +
            "WHERE dog_owners.owner_id=?;";
		var inserts = [owner_id];

-- get All dogs
		mysql.pool.query("SELECT dogs.dog_id, dogs.dog_name, shelter.shelter_name FROM dogs INNER JOIN shelter ON dogs.shelter_id=shelter.shelter_id;", function(error, results, fields){
		if(error){

-- new vaccine date for a dog
		var sql = "INSERT INTO dog_owners(adoption_date, dog_id, owner_id) VALUES  (?,?,?)";
 
 -- update dog details
         var sql = "UPDATE dogs SET dog_name=?, birth_date=?, gender=?, breed=?, color=?, weight=?, shelter_id=?, availability=? WHERE dog_id=?";
        var inserts = [req.body.dog_name, req.body.birth_date, req.body.dog_gender, req.body.dog_breed, req.body.dog_color, req.body.dog_weight, req.body.dog_shelter, req.body.dog_availability, req.params.id];
		sql = mysql.pool.query(sql,inserts,function(error, results, fields){

-- get owners
		mysql.pool.query("SELECT owner_id, first_name, last_name, address, city, state, zip_code, phone_number, email FROM owner;", function(error, results, fields){
 
 
 
 -- update owners
         var sql = "INSERT INTO owner (first_name, last_name, address, city, state, zip_code, phone_number, email) VALUES (?,?,?,?,?,?,?,?)";
        var inserts = [req.body.first_name, req.body.last_name, req.body.address, req.body.city, req.body.state, req.body.zip_code, req.body.phone_number, req.body.email];
		sql = mysql.pool.query(sql,inserts,function(error, results, fields){

-- get shelter details
		var sql ="SELECT shelter_id, shelter_name, address, city, state, zip_code, phone_number, email FROM shelter WHERE shelter_id=?";
		var inserts = [shelter_id];

-- get shelter names
		mysql.pool.query("SELECT shelter_id, shelter_name FROM shelter;", function(error, results, fields){
    
 -- update shelter details
         var sql = "UPDATE shelter SET shelter_name=?, address=?, city=?, state=?, zip_code=?, phone_number=?, email=? WHERE shelter_id=?";
        var inserts = [req.body.shelter_name, req.body.shelter_address, req.body.shelter_city, req.body.shelter_state, req.body.shelter_zip_code, req.body.shelter_phone_number, req.body.shelter_email, req.params.id];
		sql = mysql.pool.query(sql,inserts,function(error, results, fields){

-- get shelters
        mysql.pool.query("SELECT shelter_id, shelter_name, address, city, state, zip_code, phone_number, email FROM shelter;", function(error, results, fields){


-- insert stuff into shelter
        var sql = "INSERT INTO shelter (shelter_name, address, city, state, zip_code, phone_number, email) VALUES (?,?,?,?,?,?,?)";
		var inserts = [req.body.shelter_name, req.body.address, req.body.city, req.body.state, req.body.zip_code, req.body.phone_number, req.body.email];

-- select vaccines
		mysql.pool.query("SELECT vaccination_id, vaccine_name FROM vaccinations;", function(error, results, fields){
 
 -- add new vaccines to db
         var sql = "INSERT INTO vaccinations (vaccine_name) VALUES (?)";
var inserts = [req.body.vacc_name];

-- update vaccinations
		var sql = "UPDATE vaccinations SET vaccine_name=? WHERE vaccination_id=?";
 
-- get vets
		mysql.pool.query("SELECT first_name, last_name, address, city, state, zip_code phone_number FROM vet;", function(error, results, fields){ 

-- insert stuff into vets

        var sql = "INSERT INTO vet (first_name, last_name, address, city, state, zip_code, phone_number, shelter_id) VALUES (?,?,?,?,?,?,?,1)";
        var inserts = [req.body.first_name, req.body.last_name, req.body.address, req.body.city, req.body.state, req.body.zip_code, req.body.phone_number];
		sql = mysql.pool.query(sql,inserts,function(error, results, fields){