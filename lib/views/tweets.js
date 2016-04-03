define([
    'backbone',
    'backbone.marionette',
    'backbone.wreqr',
    'app/models/tweets',
    'app/views/tweet'],

    function(Backbone, Marionette, Wreqr, TweetsCollection, TweetView){

    var TweetsView = Marionette.CollectionView.extend({
        collection: new TweetsCollection(),
        childView: TweetView,

        initialize: function(paths) {
            this.tweetChannel = Wreqr.radio.channel('tweet');
            this.tweetChannel.vent.on('tweet', _.bind(this.update, this));
        },

        onBeforeDestroy: function() {
            this.tweetChannel.vent.off('tweet');
        },

        update: function(data) {
            this.collection.add(data, {at: 0});
        }

    });

    return TweetsView;
});
