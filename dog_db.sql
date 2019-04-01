/*
Giselle Northy
CS340 Create Database & Sample data
*/


DROP TABLE IF EXISTS dogs;
CREATE TABLE dogs(
	dog_id INT AUTO_INCREMENT,
	dog_name VARCHAR(100) NOT NULL,
	birth_date DATE,
	gender VARCHAR(100) NOT NULL,
	breed VARCHAR(100) NOT NULL DEFAULT 'Unknown',
	color VARCHAR(100) NOT NULL DEFAULT 'Unknown',
	weight SMALLINT(3),
	availability VARCHAR(100) NOT NULL,
	shelter_id INT,
	owner_id INT,
	PRIMARY KEY(dog_id)
	-- Shelter ID Foreign Key, to be updated in the ALTER statement to be shelter_id
	-- Owner ID Foreign Key
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

DROP TABLE IF EXISTS shelter;
CREATE TABLE shelter (
	shelter_id INT AUTO_INCREMENT,
	shelter_name VARCHAR(100) NOT NULL,
	address VARCHAR(100) NOT NULL,
	city VARCHAR(100) NOT NULL,
	state VARCHAR(100) NOT NULL,
	zip_code VARCHAR(100) NOT NULL,
	phone_number VARCHAR(100) NOT NULL,
	email VARCHAR(100) NOT NULL,
	PRIMARY KEY(shelter_id)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;



DROP TABLE IF EXISTS owner;
CREATE TABLE owner(
	owner_id INT AUTO_INCREMENT,
	first_name VARCHAR(100) NOT NULL,
	last_name VARCHAR(100) NOT NULL,
	address VARCHAR(100) NOT NULL,
	city VARCHAR(100) NOT NULL,
	state VARCHAR(100) NOT NULL,
	zip_code VARCHAR(100) NOT NULL,
	phone_number VARCHAR(100) NOT NULL,
	email VARCHAR(100) NOT NULL,
	PRIMARY KEY(owner_id)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;


DROP TABLE IF EXISTS vet;
CREATE TABLE vet(
	vet_id INT AUTO_INCREMENT,
	first_name VARCHAR(100) NOT NULL,
	last_name VARCHAR(100) NOT NULL,
	address VARCHAR(100) NOT NULL,
	city VARCHAR(100) NOT NULL,
	state VARCHAR(100) NOT NULL,
	zip_code VARCHAR(100) NOT NULL,
	phone_number VARCHAR(100) NOT NULL,
	shelter_id INT,
	PRIMARY KEY(vet_id)
	-- Foreign key shelter_id
) ENGINE=InnoDB DEFAULT CHARSET=latin1;


DROP TABLE IF EXISTS vaccinations;
CREATE TABLE vaccinations(
	vaccination_id INT AUTO_INCREMENT,
	vaccine_name VARCHAR(100) NOT NULL,
	PRIMARY KEY(vaccination_id)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

DROP TABLE IF EXISTS vaccination_dates;
CREATE TABLE vaccination_dates(
	dates_id INT AUTO_INCREMENT,
	vaccination_date DATE NOT NULL,
	dog_id INT,
	vaccination_id INT,
	PRIMARY KEY(dates_id)
	-- Foreign Key dog_id
	-- Foreign Key vaccine vaccination_id
) ENGINE=InnoDB DEFAULT CHARSET=latin1;


DROP TABLE IF EXISTS dog_owners;
CREATE TABLE dog_owners(
	dogowners_id INT AUTO_INCREMENT,
	adoption_date DATE NOT NULL,
	dog_id INT,
	owner_id INT,
	PRIMARY KEY(dogowners_id)
	-- Foreign key dog_id
	-- Foregin key owner_id
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
 

-- ALTER TABLE STATEMENTS TO ADD FOREIGN KEYS TO TABLES

ALTER TABLE dogs
ADD CONSTRAINT fk_res_1
FOREIGN KEY shelter(shelter_id)
REFERENCES shelter(shelter_id)
ON DELETE CASCADE;

ALTER TABLE dogs
ADD CONSTRAINT fk_res_2
FOREIGN KEY owner(owner_id)
REFERENCES owner(owner_id)
ON DELETE CASCADE;

ALTER TABLE vet
ADD CONSTRAINT fk_res_3
FOREIGN KEY shelter(shelter_id)
REFERENCES shelter(shelter_id)
ON DELETE CASCADE;

ALTER TABLE vaccination_dates
ADD CONSTRAINT fk_res_4
FOREIGN KEY dogs(dog_id)
REFERENCES dogs(dog_id)
ON DELETE CASCADE;

ALTER TABLE vaccination_dates
ADD CONSTRAINT fk_res_5
FOREIGN KEY vaccinations(vaccination_id)
REFERENCES vaccinations(vaccination_id)
ON DELETE CASCADE;

ALTER TABLE dog_owners
ADD CONSTRAINT fk_res_6
FOREIGN KEY dogs(dog_id)
REFERENCES dogs(dog_id)
ON DELETE CASCADE;

ALTER TABLE dog_owners
ADD CONSTRAINT fk_res_7
FOREIGN KEY owner(owner_id)
REFERENCES owner(owner_id)
ON DELETE CASCADE;

-- INSERT DATA

INSERT INTO shelter(shelter_name, address, city,state, zip_code, phone_number, email) VALUES ('Oregon Human Society', '1234 West Shelter Lane', 'Hillsboro', 'Oregon', '97140', '123-567-8901', 'oregonhumane@society.com');
INSERT INTO owner(first_name, last_name, address, city, state, zip_code, phone_number, email) VALUES ('Bob', 'Dogowner', '1345 Owner Lane', 'Sherwood', 'Oregon', '97130', '761-255-1990', 'dogowner@dogowners.com');
INSERT INTO dogs(dog_name, birth_date, gender, breed, color, weight, availability, shelter_id, owner_id) VALUES ('Odin', '2015-01-01', 'male', 'shepherd mix', 'brindle', 70, 'adopted', 1, 1);
INSERT INTO vet(first_name, last_name, address, city, state, zip_code, phone_number, shelter_id) VALUES ('Mary', 'Veterson', '345 Vet Lane', 'Dallas', 'Texas', '45672', '561-255-1990', 1);
INSERT INTO vaccinations(vaccine_name) VALUES ('Bortella');
INSERT INTO vaccination_dates(vaccination_date, dog_id, vaccination_id) VALUES ('2015-01-01', 1, 1);
INSERT INTO dog_owners(adoption_date, dog_id, owner_id) VALUES ('2016-02-15', 1, 1);


/*
SELECT * FROM shelter;
SELECT * FROM dogs;
SELECT * FROM owner;
SELECT * FROM dog_owners;
SELECT * FROM vaccination_dates;
SELECT * FROM vaccinations;
SELECT * FROM vet;
*/