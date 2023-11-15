function display(userId) {
    $.ajax({
        type: 'GET',
        url: `http://localhost:8080/history/${userId}`,
        success: function(data) {
            debugger
        },
        error: function(error) {

        }
    })
}