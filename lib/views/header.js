define([
    'jquery',
    'backbone',
    'backbone.marionette',
    'backbone.wreqr',
    'tpl!app/templates/header_view.html'
    ],

    function($, Backbone, Marionette, Wreqr, HeaderTemplate){

    var sidedrawer = Wreqr.radio.channel('sidedrawer');

    var HeaderView = Marionette.ItemView.extend({

        initialize: function() {
        },

        serializeModel: function (model) {
            return {routes: model};
        },

        ui: {
            hamburguer: 'a.sidedrawer-toggle'
        },

        events: {
            'click @ui.hamburguer': 'hamburguer'
        },

        hamburguer: function(evt) {
            sidedrawer.vent.trigger('click');
        },

        open_url: function(evt){
            Backbone.history.navigate(evt.currentTarget.pathname, {trigger: true});
            // $('#nav-bar').addClass('collapse');
            // $('#nav-bar').removeClass('in');
            return false;
        },

        template: HeaderTemplate
    });

    return HeaderView;
});
