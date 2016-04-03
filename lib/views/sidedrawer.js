define([
    'jquery',
    'underscore',
    'backbone',
    'backbone.marionette',
    'backbone.wreqr',
    'tpl!app/templates/sidedrawer_view.html'
    ],

    function($, _, Backbone, Marionette, Wreqr, DrawerTemplate){

    var sidedrawer = Wreqr.radio.channel('sidedrawer');

    var SideDrawerView = Marionette.ItemView.extend({

        initialize: function(routes) {
            this.model = routes;
        },

        serializeModel: function (model) {
            return {routes: model};
        },

        events: {
            'click a': 'open_url'
        },

        open_url: function(evt){
            Backbone.history.navigate(evt.currentTarget.pathname, {trigger: true});
            sidedrawer.vent.trigger('select');
            return false;
        },

        template: DrawerTemplate
    });

    return SideDrawerView;
});
