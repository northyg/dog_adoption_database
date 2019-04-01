function updateDog(id){
    $.ajax({
        url: '/dog_details/' + id,
        type: 'PUT',
        data: $('#update-dog').serialize(),
        success: function(result){
            window.location.replace("./dogs");
        }
    })
};


function selectGender(gen) {
    for (var i = 0; i < document.getElementById("gender-selector").length; ++i) {
	if ( document.getElementById("gender-selector").options[i].value == gen ) {
	    document.getElementById("gender-selector").selectedIndex = i;
	}
    } 	
};


function selectAvailability(avail) {
    for (var i = 0; i < document.getElementById("availability-selector").length; ++i) {
	if ( document.getElementById("availability-selector").options[i].value == avail ) {
	    document.getElementById("availability-selector").selectedIndex = i;
	}
    } 	
};


function selectShelter(id) {
    $('#shelter-selector').val(id);
};

function selectAvailabilityBox(coming_soon, adoptable, adopted){
    if (coming_soon == "checked"){
	document.getElementById("comingsoon_checkbox").checked= true;
    }
    else {
	document.getElementById("comingsoon_checkbox").checked= false;
    }


    if (adoptable == "checked"){
        document.getElementById("adoptable_checkbox").checked= true;
    }
    else {
        document.getElementById("adoptable_checkbox").checked= false;
    }

    if (adopted == "checked"){
        document.getElementById("adopted_checkbox").checked= true;
    }
    else {
        document.getElementById("adopted_checkbox").checked= false;
    }
};
