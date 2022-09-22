const http = require('http'); //http is a module- require is returning module.exports in the http module for us, with its functions and variables
//declare variables as const by default- only use let if you know you need to change something. If on rare chance you can't use let, use var
const hostname = '127.0.0.1'; //home ip address, equiv of localhost
const port = 3000;  //every program that needs to recieve network packets has a port number assigned to it
                    //all messages recieved with this number will be given to that program
                    //some programs have recognized standard port numbers- be careful not to use them in our own programs

const server = http.createServer((req, res) => { //return doesn't work in asynchoronous programming- we only have one thread that cannot wait
  res.statusCode = 200;                          //response object lets us send info to the client avoiding this problem, 200 statuscode means recieved okay
  res.setHeader('Content-Type', 'text/plain');
  res.end('Happy New Year');
});

server.listen(port, hostname, () => {   //no parameters, asynchronous function that registers with client OS, callback function
  console.log(`Server running at http://${hostname}:${port}/`); //writes message for console, note that this uses backticks not single quotes for a string template
  console.log(`Server still running at http://` + hostname + `:` + port + `/`);
});     



/*
    lambda or fatarrow function:
    const fatArrow = x => x * 2;
*/