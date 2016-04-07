define([
    'jquery',
    'backbone.marionette',
    'backbone.wreqr',
    'app/models/score',
    'tpl!app/templates/score_view.html'
    ],

    function($, Marionette, Wreqr, Score, ScoreTemplate){

    var ScoreView = Marionette.ItemView.extend({
        template: ScoreTemplate,

        modelEvents: {
            "change": "render"
        },

        model: new Score(),

        initialize: function(paths) {
            this.tweetChannel = Wreqr.radio.channel('score');
            this.tweetChannel.vent.on('score', _.bind(this.update, this));
            this.model.fetch();
        },

        onBeforeDestroy: function() {
            this.tweetChannel.vent.off('score');
        },

        update: function(data) {
            this.model.set(data);
        }

    });

    return ScoreView;
});
