$(document).ready(function() {
    var socket = io(), nickname, tweets = $('#tweets');

    socket.on('message', function(channel, msg) {
        var data = JSON.parse(msg);
        var txt = data.user + ': ' + data.msg;

        console.log(txt);
        tweets.prepend($('<li class="' + data.status + '">').text(txt));
    });
});
