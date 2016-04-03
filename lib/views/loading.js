define([
    'backbone.marionette'
    ],

    function(Marionette){

    var LoadingView = Marionette.ItemView.extend({
        template: '<div class="sk-rotating-plane"></div>'
    });

    return LoadingView;
});
