const http = require('http');

//Request Listener Function
// function rqListener(req, res){

// }

//Creating a Server
// http.createServer(rqListener);
// http.createServer(function(req,res){
// });

//Creating a basic server with event listener function
const server = http.createServer((req, res) => {
    //Listening and handle requests
    console.log(req.url, req.method, req.headers);
    //process.exit();
    //Sending Reponses
    res.setHeader('Content-Type', 'text/html');
    res.write('<html>');
    res.write('<head><title>My first Page</title></head>');
    res.write('<body><h1>My first Page</h1></body>');
    res.write('</html>');
    res.end();
});

server.listen(3000);