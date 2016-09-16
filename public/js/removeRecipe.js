$(document).ready(function() {
  $('.delete-favorite').on('click', deleteRecipe);
});


// Delete User
function deleteRecipe(event) {
    var confirmation = confirm('Are you sure you want to delete this recipe?');
    if (confirmation === true) {
        $.ajax({
            type: 'DELETE',
            url: '/deleterecipe/' + $(this).attr('rel')
        }).done(function( response ) {
            if (response.msg === '') {
            }
            else {
                alert('Error: ' + response.msg);
            }
        });
        window.location.reload();
    }
    else {
        return false;
    }
};
