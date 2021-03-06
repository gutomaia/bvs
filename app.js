// Startup Express App
var express = require('express');
var app = express();

var http = require('http').Server(app);
var io = require('socket.io')(http);

http.listen(process.env.PORT || 8888);

var bluebird = require('bluebird');
var redis = require('redis');
bluebird.promisifyAll(redis.RedisClient.prototype);
bluebird.promisifyAll(redis.Multi.prototype);

function getRedisClient() {
    var credentials;
    if(process.env.VCAP_SERVICES) {
        var env = JSON.parse(process.env.VCAP_SERVICES);
        credentials = env['redis-2.6'][0].credentials;
    } else {
        credentials = { "host": "127.0.0.1", "port": 6379 };
    }
    var redisClient = redis.createClient(credentials.port, credentials.host);
    if('password' in credentials) {
        redisClient.auth(credentials.password);
    }
    return redisClient;
}

var path = require('path');
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'external')));
app.use(express.static(path.join(__dirname, 'lib')));

app.get('/', function(req, res) {
    res.render('index.html');

});

app.get('/tweets', function(req, res) {
    var db = getRedisClient();
    var tweets = db.lrange('tweets', 0, 99, function(err, reply) {
        if (!err) {
            var result = [];
            for (var msg in reply) result.push(JSON.parse(reply[msg]));
            res.send(result);
        } else {
            res.sendStatus(400);
        }
    });
    db.quit();
});

app.get('/score', function(req, res) {
    var db = getRedisClient();
    var positive, negative, neutral, error;

    db.multi()
        .get('positive')
        .get('negative')
        .get('neutral')
        .get('error')
        .execAsync().then(function(opinion) {
            var data = {
                positive: opinion[0],
                negative: opinion[1],
                neutral: opinion[2],
                error: opinion[3]
            };
            res.send(data);
    });
    db.quit();
});

io.on('connection', function(socket) {
    var sub = getRedisClient();
    sub.subscribe('tweet');
    sub.subscribe('opinion');
    sub.subscribe('score');
    sub.on('message', function(channel, message) {
        socket.send(channel, message);
    });

    socket.on('disconnect', function() {
        sub.unsubscribe('tweet');
        sub.unsubscribe('opinion');
        sub.unsubscribe('score');
        sub.quit();
    });
});
