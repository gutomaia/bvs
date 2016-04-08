bvs
==========

This is the frontend application for the "Batman VS Superman Opinions", the goal here is to provide a progressive app interface as nice as a native phone application. Also, provide API and SocketIO communication for app tasks.

How does it work
----------------

On the progressive app application, everything resides inside the lib path. It uses require.js as an AMD loader for dependencies. It uses Backbone and Marionette as main javascript frameworks for organizing stuff. If you ever developed a native application, it is all there. Likewise Models/Views are almost the same, templates is just the interface. And for events I use Backbone's Wreqr.

For API and SocketIO, everything is on the app.js. It's quite simple since it only receives data and never pushes anything.

Features
--------

 - Mobile first thinking.
 - Nice and responsive css using MUI-css
 - Avoided javascript pyramid of doom callback hell
 - Quite fast and responsive.

I mean, it was designed for mobile. I used a custom progressive app shell that I was building with backbone.

Async
-----

The receive of the tweet and the processing the request on alchemyapi are dealeded apart, what gives a better feedback for the user on interface. SocketIO events were sended to Wreqr channels. Thouse channels listeners are

Services
--------

It needs Redis for the SocketIO interface. It should be configured to use the sabe redis DB of the bvs-worker.


Tests
-----

Didn't have time yet. Be welcome to post some. I was thinking in use JSDom and some mocks just to unit test some views alone.

Run
---

Just type: make run. The application will start. However, you stell need to also start localy a instance of the bvs-worker to see something on screen. Other wise it would be just a blank

Features taggeds as nice
------------------------

Use of a manifest of some neat color schemes.
Use of a service worker to cache stuff, that would increase the second boottime.
Use of push notifications to push score milestones.

Reporting Issues
----------------

Pull requests and open issues were welcome.

License
-------

It's a standard MIT license, fell free to share.
