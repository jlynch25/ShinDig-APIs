    <script src="http://ajax.googleapis.com/ajax/libs/jquery/1.11.1/jquery.min.js"></script>
      getComments();


function getComments() {
    $.ajax({
        url: '/friendslist',
        type: 'GET',
        data: {userOne: "5c90e62b274a4d796fd19fde" },
        success: function (data) {
            var posts = "";
            for (var i = 0; i < data.length; i++) {
                posts += '<div class="row"><div class="col"></div><div class="col-7" id="friendBlock"><div class="container-fluid"><p>'+ data[i].relationships.recipient.user_name +'</p><button class="btn btn-danger" data-toggle="modal" data-target="#confirmRemove">Remove</button></div></div><div class="col"></div></div>';
            }
            $("#friendFeed").html(posts);
        }
    });

    //Recursively call getComments every 10 second
    setTimeout(getComments, 10000);
}
