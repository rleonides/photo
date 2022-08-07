const app = require('./app')
const http = require('http')
var httpServer = http.createServer(app);
httpServer.listen(3001,app.get('port'),() => {
  console.log(`RegisterApp at: https://localhost:${app.get("port")}/`);
})
