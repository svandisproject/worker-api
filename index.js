const io = require('socket.io')();
const jwt = require('jsonwebtoken');
const axios = require('axios');
require('colors');
const config = require('./config');
const fs = require('fs');
const Queue = require('better-queue');

try {
  const publicKey = fs.readFileSync(config.PUBLIC_KEY_PATH, 'utf8');
  axios.get(`${config.API_URL}/schedule`, { headers: {'X-SOCKET-SERVER-TOKEN': config.API_SECRET}})
    .then((response) => {
      console.log(response.data);
    })
    .catch((error) => {
      console.log(error);
      process.exit(1);
    })
  ;

} catch (error) {
  console.log('Couln\'t read public key file'.red);
  process.exit(1);
}

// io.use((socket, next) => {
//   let token = socket.handshake.query.token;
//   if (token) {
//     try {
//       const decodedToken = jwt.verify(token, publicKey);
//       socket.connectedUser = decodedToken;
//       next();
//     } catch (err) {
//       console.error(err);
//       next(new Error('Token is not valid'));
//       socket.disconnect();
//     }
//   }
// });


// const workerQueue = new Queue();
// const taskQueue = new Queue();
//
//
//
//
//
//
// fs.readFile('public.pem', 'utf8', (err, key) => {
//   if (err) throw err;
//   io.use((socket, next) => {
//     let token = socket.handshake.query.token,
//       decodedToken;
//     if (token) {
//       try {
//         decodedToken = jwt.verify(token, key);
//         socket.connectedUser = decodedToken;
//         next();
//       } catch (err) {
//         console.error(err);
//         next(new Error('Token is not valid'));
//         socket.disconnect();
//       }
//     }
//     const secret = socket.handshake.query.secret;
//     if (secret) {
//       axios.post(`${config.API_URL}/worker/authenticate`, {
//         secret,
//       })
//         .then(() => {
//           console.log('Worker attached to pool'.green);
//           workerQueue.push(socket.id);
//           next();
//         })
//         .catch((error) => {
//           console.error(error);
//           next(new Error('Worker secret is not valid'));
//           socket.disconnect();
//         });
//     }
//     next();
//   });
//
//   console.log('Server started');
//   io.listen(1337);
// });
//
// io.on('connection', (client) => {
//   console.log('Client connected'.green);
//
//   io.on('disconnected', (socket) => {
//     console.log('Client disconnected'.red);
//   });
// });
//
// axios.post(`${config.API_URL}/schedule`);

// Coindesk

// setInterval(() => {
//     console.log('Crawl task emitted');
//     for(let i in workerPool) {
//         if(workerPool[i].status === STATUS_FREE) {
//             console.log('Found free worker'.green)
//             io.to(workerPool[i].id).emit('worker-crawl-task', {
//                 name: 'web',
//                 url: 'https://www.coindesk.com/',
//                 config: {
//                     titleSelector: '.article-top-title',
//                     contentSelector: '.article-post-container',
//                     publishedAtSelector: '.article-container-left-timestamp',
//                     dateFormat: 'MMM, D, YYYY at HH:mm',
//                     timeInterval: 60000
//                 }});
//             workerPool[i].status = STATUS_BUSY;
//             break;
//         }
//     }
// }, 10000)

// Cointelegraph

// setInterval(() => {
//     console.log('Crawl task emitted');
//     for(let i in workerPool) {
//         if(workerPool[i].status === STATUS_FREE) {
//             console.log('Found free worker'.green)
//             io.to(workerPool[i].id).emit('worker-crawl-task', {
//                 name: 'web',
//                 url: 'https://cointelegraph.com',
//                 config: {
//                     titleSelector: '.header',
//                     contentSelector: '.post-full-text',
//                     publishedAtSelector: '.date',
//                     // dateFormat: 'MMM, D, YYYY at HH:mm',
//                     timeInterval: 60000
//                 }});
//             workerPool[i].status = STATUS_BUSY;
//             break;
//         }
//     }
// }, 10000)

// Twitter

// setInterval(() => {
//     console.log('Crawl task emitted');
//     for(let i in workerPool) {
//         if(workerPool[i].status === STATUS_FREE) {
//             console.log('Found free worker'.green);
//             io.to(workerPool[i].id).emit('worker-crawl-task', {
//                 name: 'twitter',
//                 config: {
//                     mode: 'feed',
//                     consumerKey: 'WA2bp5AEDMUbSSzCti4hOHbRj',
//                     consumerSecret: 'x6ga3jkyOZ1QkzMqql6WvJRGzBKKn1sfdGGOw09KiNhHF4e16G',
//                     accessTokenKey: '969914826058235904-ly8qj1WkXLvBfXEv61AnGpWJaPaCXP2',
//                     accessTokenSecret: 'NGBOI5VuO5zxplcNF6meKN2jJ4Zbo4rsfBuQ1IOOJKRq1',
//                     timeInterval: 60000
//                 }});
//             workerPool[i].status = STATUS_BUSY;
//             break;
//         }
//     }
// }, 10000);
//
// // Facebook
//
// setInterval(() => {
//     console.log('Crawl task emitted');
//     for(let i in workerPool) {
//         if(workerPool[i].status === STATUS_FREE) {
//             console.log('Found free worker'.green);
//             io.to(workerPool[i].id).emit('worker-crawl-task', {
//                 name: 'facebook',
//                 config: {
//                     email: '',
//                     password: '',
//                     timeInterval: 60000
//                 }});
//             workerPool[i].status = STATUS_BUSY;
//             break;
//         }
//     }
// }, 10000);
