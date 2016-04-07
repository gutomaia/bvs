define([
    'underscore',
    'backbone'
    ],

    function(_, Backbone){

    var ScoreModel = Backbone.Model.extend({
        url: '/score',
        defaults: {
            positive: 0,
            negative: 0,
            neutral: 0,
            error: 0
        }
    });

    return ScoreModel;

});
