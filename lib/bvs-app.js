if (typeof define !== 'function') { var define = require('amdefine')(module);}

define([
    'backbone',
    'backbone.marionette',
    'backbone.wreqr',
    'socketio',
    'app/views/main'
    ],

    function(Backbone, Marionette, Wreqr, io, MainView){

    var bvsApp = new Marionette.Application();

    if (typeof window === 'object') {
        window.bvsApp = bvsApp;
    }

    bvsApp.addRegions({
        app: '#app'
    });

    var socket = io();

    var tweet = Wreqr.radio.channel('tweet');
    var score = Wreqr.radio.channel('score');


    socket.on('message', function(channel, msg) {
        var data = JSON.parse(msg);
        if (channel == 'tweet') {
            tweet.vent.trigger('tweet', data);
        } else if (channel == 'opinion') {
            tweet.vent.trigger('opinion', data);
        } else if (channel == 'score') {
            score.vent.trigger('score', data);
        }
    });



    bvsApp.addInitializer(function() {

        var main = new MainView();
        bvsApp.app.show(main);

        Backbone.emulateHTTP = true;
        Backbone.history.start({pushState: true, hashChange: false, root:'/'});
    });

    return bvsApp;
});
