
const express = require('express');
const fs = require('fs').promises;
const path = require('path');

const app = express();
app.set('port', (process.env.PORT || 3001));
app.use(express.json({limit:'1000mb'}));
app.use('/', express.static(path.join(__dirname)));


app.post("/api/uploadPhoto", async (req, res,next) => {
  const {base64,name} = req.body;
 let b = Buffer.from(base64,'base64');
fs.writeFile(`./${name}`,b)
next();
   
});

app.get('/', function (req , res) {
  res.sendFile(path.join(__dirname,'photoUpload.html'))
})

app.listen(app.get('port'), () => {
  console.log(`Find the server at: http://localhost:${app.get('port')}/`); 
  // eslint-disable-line no-console
});

