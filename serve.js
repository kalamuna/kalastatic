// This script would exist within the node module and doesn't need to be invoked during a real project

import { kstat } from "./kstat.js";
import handler from "serve-handler";
import http from 'http';

kstat();

const server = http.createServer((request, response) => {
  // You pass two more arguments for config and middleware
  // More details here: https://github.com/vercel/serve-handler#options
  return handler(request, response, {
    "public": "build/"
  });
});

server.listen(3000, () => {
  console.log('Running at http://localhost:3000');
});
