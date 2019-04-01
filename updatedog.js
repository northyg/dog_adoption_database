function updateDog(id){
    $.ajax({
        url: '/dog_details/' + id,
        type: 'PUT',
        data: $('#update-dog').serialize(),
        success: function(result){
            window.location.replace("./");
        }
    })
};
