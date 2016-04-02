// Startup Express App
var express = require('express');
var app = express();

var http = require('http').Server(app);
var io = require('socket.io')(http);

http.listen(process.env.PORT || 3000);

var redis = require('redis');

function getRedisClient() {
    var credentials;
    if(process.env.VCAP_SERVICES) {
        var env = JSON.parse(process.env.VCAP_SERVICES);
        credentials = env['redis-2.6'][0]['credentials'];
    } else {
        credentials = { "host": "127.0.0.1", "port": 6379 }
    }
    var redisClient = redis.createClient(credentials.port, credentials.host);
    if('password' in credentials) {
        redisClient.auth(credentials.password);
    }
    return redisClient;
}

var path = require('path');
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', function(req, res) {
    var db = getRedisClient();
    var tweets = db.lrange('tweets', 0, 99, function(err, reply) {
        if (!err) {
            var result = [];
            for (var msg in reply) result.push(JSON.parse(reply[msg]));
            res.render('index', {tweets: result});
        } else {
            res.render('index');
        }
    });
});

io.on('connection', function(socket) {
    var sub = getRedisClient();
    sub.subscribe('tweet');
    sub.on('message', function(channel, message) {
        socket.send('tweet', message);
    });

    socket.on('disconnect', function() {
        sub.unsubscribe('tweet');
        sub.quit();
    });
});
