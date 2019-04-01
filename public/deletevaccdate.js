function deletevaccdate(dates_id){
    
	var r = confirm("Are you sure you want to delete that?");
	
	if (r == true) { 
	  $.ajax({
		// /dog_details?dog_id=' + id
        url: '/dog_details/' + dates_id,
        type: 'DELETE',
        success: function(result){
          if(result.responseText != undefined){
            alert(result.responseText)
          }
          else {
            window.location.reload(true)
          }
        }
    })}
	else{}	
};


//function deletevaccdate(id, dates_id){
//    $.ajax({
		// /dog_details?dog_id=' + id
//        url: '/dog_details/' + id + '/vacc_date/' + dates_id,
//        type: 'DELETE',
//        success: function(result){
//          if(result.responseText != undefined){
//            alert(result.responseText)
//          }
//          else {
//            window.location.reload(true)
//          }
//        }
//    })
//};