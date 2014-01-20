
'use strict';

var fs = require('fs'),
    util = require('util'),
    request = require("request"),
    wget = require("./wget"),
    http = require('http');

// Ignore SIGUSR
process.on('SIGUSR1', function () {});
process.on('SIGUSR2', function () {});


function Worker(config) {
    if (!(this instanceof Worker)) {
        return new Worker(config);
    }
	wget = wget(config);	
    this.runServer(config);
}

Array.prototype.unique = function() {
    var a = this.concat();
    for(var i=0; i<a.length; ++i) {
        for(var j=i+1; j<a.length; ++j) {
            if(a[i] === a[j])
                a.splice(j--, 1);
        }
    }

    return a;
};
	
Worker.prototype.runServer = function (config) {

	if (config.benchmode == 'wget') {
		wget.run();
	}
/*
request({url:'http://127.0.0.1/cc/redirect_1.html',followRedirect :false}, function (error, response, body) {
    console.log(response.headers) 
    //console.log(body) // Print the google web page.
})
*/
};

module.exports = Worker;
