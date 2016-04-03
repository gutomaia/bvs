define([
    'backbone',
    'app/models/tweet'],

    function(Backbone, Tweet){

    // var TweetModel = Backbone.Model.extend({});


    var TweetsCollection = Backbone.Collection.extend({
        model: Tweet,
        url: '/tweets',

        initialize: function(){
            this.fetch();
        }

    });

    return TweetsCollection;
});
