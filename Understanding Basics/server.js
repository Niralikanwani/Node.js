const http = require('http');
const fs = require('fs');
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
    const url = req.url;
    const method = req.method;
    if(url === '/'){
        res.write('<html>');
        res.write('<head><title>Enter message</title></head>');
        res.write('<body><form action="/message" method="POST"><input type="text" name="message"><button type="submit">Send</button></form></body>');
        res.write('</html>');
        return  res.end();
    }
    if(url === '/message' && method === 'POST'){
        const body = [];
        req.on('data',(chunk) => {
            console.log(chunk);
            body.push(chunk);
        });
        return req.on('end', () => {
            const parsedBody = Buffer.concat(body).toString();
            const message = parsedBody.split('=')[1];
            fs.writeFile('message.txt',message,(err) => { 
                res.statusCode = 302;
                res.setHeader('Location','/');
                return  res.end();
             });
            // Synchronous execution of file creation good for small file
            //fs.writeFileSync('message.txt',message);
             // res.writeHead(302,{});
            // res.statusCode = 302;
            // res.setHeader('Location','/');
            // return  res.end();
        });
        
       
    }
    //process.exit();
    //Sending Reponses
    res.setHeader('Content-Type', 'text/html');
    res.write('<head><title>Enter message</title></head>');
    res.write('<body><h1>Hello my first page</h1></body>');
    res.write('</html>');
    res.end();
});

server.listen(8000);