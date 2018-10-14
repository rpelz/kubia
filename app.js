'use strict'

const http = require('http');
const path = require('path');
const fs = require('fs');
const os = require('os');

const port = 8080;
const cwd = process.cwd();
const dir = cwd;
const nodeModules = '/node_modules/';
let dataRequests = 0;

// GetFile: reads utf8 content from a file
const getFile = path => new Promise((resolve, reject) => {
	fs.readFile(path, 'utf8', (err, data) => {
		if (err) {
			return reject(err)
		}
		resolve(data)
	})
});

// Remove URL params from file being fetched
const getPathFromUrl = url => {
	return url.split(/[?#]/)[0]
};

const secureUrl = url => {
	const encodedUrl = encodeURI(url.replace(/%/g, '%25'))
	return encodedUrl
};


console.log("Kubia server starting...");
var handler = async function(req, res) {
    console.log(`Received request from ${req.connection.remoteAddress}`);
    console.log('route:', req.url);
    const decodedUrl = getPathFromUrl(decodeURIComponent(req.url));
    let filePath = path.normalize(unescape(dir) + unescape(decodedUrl));
    const baseDir = path.parse(filePath).dir;
    console.log('decodedUrl', decodedUrl);
    console.log('filePath', filePath);
    //console.log('baseDir', baseDir);
    filePath = decodedUrl === '/' ? path.join(filePath, 'index.html') : filePath;
    if (decodedUrl === '/' || decodedUrl.endsWith('.html')) {
        console.log('handle route: index');
        const indexHtml = await getFile(filePath);
        console.log(indexHtml);
        res.writeHead(200, {
            'content-type': 'text/html'
        })
        res.end(indexHtml);
    }
    else if (decodedUrl === '/bing') {
        dataRequests++;
        console.log('handle route: bing');
        console.log(`Received /bing request ${dataRequests} from ${req.connection.remoteAddress}`);
        res.writeHead(200, {
            'content-type': 'application/json'
        })
        res.end(JSON.stringify(
            {
                hostname: os.hostname(),
                request: dataRequests
            }
        ));
    }
    else if (decodedUrl.endsWith('.js') || ecodedUrl.endsWith('.js.map')) {
        console.log('handle route: serve javascript files');
        const jsFile = await getFile(filePath);
        //console.log(jsFile);
        res.writeHead(200, {
            'content-type': 'text/javascript'
        })
        res.end(jsFile);
    }
    else if (decodedUrl.endsWith('.css')) {
        console.log('handle route: serve javascript files');
        const jsFile = await getFile(filePath);
        //console.log(jsFile);
        res.writeHead(200, {
            'content-type': 'text/css'
        })
        res.end(jsFile);
    }
    else {
        console.log('handle route: default');
        res.writeHead(200);
        res.end("You've hit " + os.hostname() + "\n");
    }
};

var httpServer = http.createServer(handler);
console.log(`Kubia server listening on port ${port}`);
httpServer.listen(port);