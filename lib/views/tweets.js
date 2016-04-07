define([
    'jquery',
    'backbone',
    'backbone.marionette',
    'backbone.wreqr',
    'app/models/tweets',
    'app/views/tweet'],

    function($, Backbone, Marionette, Wreqr, TweetsCollection, TweetView){

    var TweetsView = Marionette.CollectionView.extend({
        collection: new TweetsCollection(),
        childView: TweetView,

        initialize: function(paths) {
            this.tweetChannel = Wreqr.radio.channel('tweet');
            this.tweetChannel.vent.on('tweet', _.bind(this.update_tweet, this));
            this.tweetChannel.vent.on('opinion', _.bind(this.update_opinion, this));
        },

        onBeforeDestroy: function() {
            this.tweetChannel.vent.off('tweet');
            this.tweetChannel.vent.off('opinion');
        },

        update_tweet: function(data) {
            this.collection.add(data, {at: 0});
        },

        update_opinion: function(data) {
            $('#tw-' + data.id).addClass(data.status);
        }

    });

    return TweetsView;
});
