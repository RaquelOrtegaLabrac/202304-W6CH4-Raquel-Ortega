import http from 'http';
import url from 'url';
// Import { program } from 'commander';
import * as dotenv from 'dotenv';

dotenv.config();

const PORT = process.env.PORT || 4444;

const server = http.createServer((request, response) => {
  const calculator = (a: number, b: number) => ({
    add: a + b,
    substract: a - b,
    multiply: a * b,
    divide: a / b,
  });

  const { pathname, query } = url.parse(request.url!, true);

  if (request.method !== 'GET') {
    server.emit('error', new Error('Invalid method'));
    response.write(`<h1>Invalid method</h1>`);
    response.end();
    return;
  }

  const { a, b } = query;

  if (isNaN(Number(a)) || isNaN(Number(b))) {
    server.emit('error', new Error('Invalid data'));
    response.write('<h1>Invalid data</h1>');
    response.end();
    return;
  }

  const result = calculator(Number(a), Number(b));
  response.write(`<h1>Results:</h1>
  <p>${a}+${b} = ${result.add}</p>`);
  response.end();
});

server.listen(PORT);

server.on('listening', () => {
  console.log('Listening on port ' + PORT);
});

server.on('error', (error) => {
  console.log(error.message);
});
