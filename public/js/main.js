$(document).ready(function () {
    $('.delete-genre').on('click', function () {
        var id = $(this).data('id');
        var url = '/genres/delete/' + id;

        if (confirm("Delete this genre?")) {
            $.ajax({
                url: url,
                type: 'DELETE',
                success: function (res) {
                    console.log('Deleting genre.');
                    window.location.href = "/genres";
                },
                error: function (err) {
                    console.log("ERROR: " + err);
                }
            });
        }
    });

    $('.delete-game').on('click', function () {
        var id = $(this).data('id');
        var url = '/games/delete/' + id;

        if (confirm("Delete this game?")) {
            $.ajax({
                url: url,
                type: 'DELETE',
                success: function (res) {
                    console.log('Deleting game.');
                    window.location.href = "/games";
                },
                error: function (err) {
                    console.log("ERROR: " + err);
                }
            });
        }
    });
});