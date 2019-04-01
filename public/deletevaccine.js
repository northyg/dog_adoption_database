function deletevaccine(vaccination_id){
    
	
	$.ajax({
        url: '/vaccines/' + vaccination_id,
        type: 'DELETE',
        success: function(result){
            window.location.reload(true);
        }
    })
};
