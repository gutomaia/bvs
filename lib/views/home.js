define([
    'backbone',
    'backbone.marionette'],

    function(Backbone, Marionette){

    var HomeView = Marionette.ItemView.extend({
        template: '<div></div>',

        initialize: function(paths) {
            // Backbone.history.navigate('/ofertas', {trigger: true});
        }

    });

    return HomeView;
});
