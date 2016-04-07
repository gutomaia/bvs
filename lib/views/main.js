if (typeof define !== 'function') { var define = require('amdefine')(module);}

define([
    'jquery',
    'underscore',
    'backbone',
    'backbone.marionette',
    'backbone.wreqr',
    'mui',
    'app/views/sidedrawer',
    'app/views/header',
    'app/views/loading',
    'tpl!app/templates/main_view.html'],

    function($, _, Backbone, Marionette, Wreqr, mui, SideDrawer, Header, Loading, MainViewTemplate){


    var MainView = Marionette.LayoutView.extend({
        initialize: function(app) {
            this.routes = [
                {url:'', view:'opinions'},
                {name:'about', url:'about', view:'about', icon: 'fa-arrow-right'}
            ];
            var router = new Backbone.Router();
            var content = this.getRegion('content');
            this.routes.forEach(function(r){
                router.route(r.url, function(){
                    content.show(new Loading());
                    var route_args = arguments;
                    require(['app/views/' + r.view], function(View){
                        content.show(new View(route_args));
                    });
                });
            });

            this.mui = mui;

            this.hamburger = Wreqr.radio.channel('sidedrawer');
            this.hamburger.vent.on('click', _.bind(function() {
                var width = (window.innerWidth > 0) ? window.innerWidth : screen.width;
                if (width < 544) {
                    this.showSidedrawer();
                } else if (width < 768) {
                    this.showSidedrawer();
                } else {
                    this.hideSidedrawer();
                }
            }, this));

            this.hamburger.vent.on('select', _.bind(function() {
                this.ui.sidedrawer
                  .removeClass('active')
                  .appendTo(document.body);
                $('body').removeClass('mui-body--scroll-lock');
                $('#mui-overlay').remove();
            }, this));

        },

        template: MainViewTemplate,

        ui: {
            sidedrawer: '#sidedrawer',
            header: '#header',
            content: '#content-wrapper'
        },

        regions: {
            sidedrawer: '@ui.sidedrawer',
            header: '@ui.header',
            content: '@ui.content'
        },

        showSidedrawer: function () {

            var sidedrawer = this.ui.sidedrawer;
            var options = {
              onclose: function() {
                sidedrawer
                  .removeClass('active')
                  .appendTo(document.body);
              }
            };

            var overlay = $(this.mui.overlay('on', options));
            this.ui.sidedrawer.appendTo(overlay);

            setTimeout(
                _.bind(function(){
                    this.ui.sidedrawer.addClass('active');
                }, this), 20);
        },

        hideSidedrawer: function () {
            this.$el.toggleClass('hide-sidedrawer');
        },

        resize: function() {
            if (this.resizeTimer) {
                window.clearTimeout(this.resizeTimer);
            }
            this.resizeTimer = window.setTimeout(_.bind(this.actualResize, this), 700);
        },

        actualResize: function() {
            if (typeof this.content.currentView.resize === 'function') {
                this.content.currentView.resize();
            }
            // // var topOffset = 50;
            // var width = (window.innerWidth > 0) ? window.innerWidth : screen.width;
            // var height = ((window.innerHeight > 0) ? window.innerHeight : screen.height) - 1;

            // if (width < 768) {
            //     this.ui.sidedrawer.
            //     $('div.navbar-collapse').addClass('collapse');
            //     // topOffset = 100; // 2-row-menu
            // } else {
            //     $('div.navbar-collapse').removeClass('collapse');
            // }
            return;
        },

        onShow: function() {
            this.header.show(new Header());
            this.sidedrawer.show(new SideDrawer(this.routes));
            window.onresize = _.bind(this.resize, this);
        }
    });

    return MainView;
});
