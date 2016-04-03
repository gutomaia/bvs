define([
    'backbone.marionette',
    'tpl!app/templates/tweet_view.html'
    ],

    function(Marionette, TweetTemplate){

    var TweetView = Marionette.ItemView.extend({
        template: TweetTemplate
    });

    return TweetView;
});
