define([
    'backbone',
    'backbone.marionette',
    'app/views/score',
    'app/views/tweets',
    'tpl!app/templates/opinions_view.html'],

    function(Backbone, Marionette, Score, Tweets, OpinionsTemplate){

    var OpinionsView = Marionette.LayoutView.extend({

        initialize: function(paths) {
            this.tweetsView = new Tweets();
        },

        template: OpinionsTemplate,

        ui: {
            score: '.score',
            tweets: '.tweets'
        },

        regions: {
            score: '@ui.score',
            tweets: '@ui.tweets'
        },

        onShow: function() {
            this.score.show(new Score());
            this.tweets.show(this.tweetsView);
        }

    });

    return OpinionsView;
});
