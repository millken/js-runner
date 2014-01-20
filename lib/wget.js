
'use strict';

var url = require('url');
var exec = require('child_process').exec,
	Fiber = require('fibers')
;

function Wget(config) {
    if (!(this instanceof Wget)) {
        return new Wget(config);
    }

    this.config = config;

}

Wget.prototype.getHost = function (headers) {
  var parts = headers['host'].trim().split(':');
  return parts[0].trim();
};

Wget.prototype.getPort = function (headers) {
  var parts = headers['host'].trim().split(':');
  return (parts[1] || '80').trim();
};

Wget.prototype.run = function () {

function sleep(ms) {
    var fiber = Fiber.current;
    setTimeout(function() {
        fiber.run();
    }, ms);
    Fiber.yield();
}

if (process.platform == 'win32') {
        // There is a problem with running this from a script. Not fibers related.
        console.log('pass');
} else {
	while(1) {
        Fiber(function() {
                exec('wget http://127.0.0.1 --tries=1 --timeout=3 --user-agent=ua -q -O /dev/null', function(err, stdout) {
                        if (err) console.log(err);
                        process.kill('SIGTERM');
                });
        sleep(1000);      
        }).run();
	}        
}

};

module.exports = Wget;
