function updateShelter(id){
    $.ajax({
        url: '/shelter_details/' + id,
        type: 'PUT',
        data: $('#update-shelter').serialize(),
        success: function(result){
			window.location.replace("./shelters")
        }
    })
};
