function updateVaccine(id){
    
	$.ajax({
        url: '/vaccines/' + id,
        type: 'PUT',
        data: $('#update-vaccine').serialize(),
        success: function(result){
            window.location.reload(true);
        }
    })
};