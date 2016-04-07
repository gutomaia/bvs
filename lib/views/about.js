define([
    'backbone',
    'backbone.marionette',
    'app/views/tweets',
    'tpl!app/templates/opinions_view.html'],

    function(Backbone, Marionette, Tweets, OpinionsTemplate){

    var AboutView = Marionette.LayoutView.extend({

        initialize: function(paths) {
            this.tweetsView = new Tweets();
        },

        template: OpinionsTemplate,

        ui: {
            tweets: '.tweets'
        },

        regions: {
            tweets: '@ui.tweets'
        },

        onShow: function() {
            this.tweets.show(this.tweetsView);
        }

    });

    return AboutView;
});
