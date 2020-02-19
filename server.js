var http = require('http');
var fs = require('fs');
var path = require('path');
var mime = require('mime')
var cache = {};

function send404(response) {
    response.writeHead(404, { 'Context-Type': 'text/plain' });
    response.write('Errot 404: File not found');
    response.add();
}

function sendFile(response, filePath, fileContext) {
    response.writeHead(200, { "context-type": mime.lookup(path.basename(filePath)) });
    response.end(fileContext);
}

function serveStatic(response, cache, absPath) {
    if (cache[absPath]) {
        sendFile(response, absPath, cache[absPath]);
    } else {
        fs.exists(absPath, function (exists) {
            if (exists) {
                fs.readFile(absPath, function (err, data) {
                    if (err) {
                        send404(response);
                    } else {
                        cache[absPath] = data;
                        sendFile(response, absPath, data);
                    }
                });
            } else {
                send404(response);
            }
        });
    }
}