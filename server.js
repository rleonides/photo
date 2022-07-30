/* eslint-disable no-param-reassign */
const express = require('express');
const multer  = require('multer')
const mkdir = require('fs').mkdirSync;
const fs = require('fs').promises;
const path = require('path');
const bodyParser = require('body-parser')
const app = express();
app.set('port', (process.env.PORT || 3001));
app.use(express.json());
app.use('/', express.static(path.join(__dirname, 'public')));
const stripe = require("stripe")("sk_test_51JQK47EPLWeDUJKNZr4BKx3eJXVmCnTM76iNkYKQvnI0ai88Np28xzXZFBYMl8VeZrACuPIY34HFpDipWsbzuEci00YoZBiHei");

const calculateOrderAmount = items => {
  // Replace this constant with a calculation of the order's amount
  // Calculate the order total on the server to prevent
  // people from directly manipulating the amount on the client
  
  return 1200*items;
};

app.post("/create-payment-intent", async (req, res) => {
  const { items } = req.body;
  // Create a PaymentIntent with the order amount and currency
  const paymentIntent = await stripe.paymentIntents.create({
    amount: calculateOrderAmount(items),
    currency: "mxn"
  });

  res.send({
    clientSecret: paymentIntent.client_secret
  });
});

app.post("/api/send", async (req, res) => {
  const {buy} = req.body;
  // Create a PaymentIntent with the order amount and currency
  //console.log(req.body)
   let urls= [];
  for( let t of buy)
  { 
     for(let u of t.urls)
      urls.push(u.url);  

  }

     let promise_arr = [];
    for(let img of urls )
      promise_arr.push(fs.readFile(path.join( './public/' + img )));
   Promise.all(promise_arr).then(arr => res.send({images : arr}));
   
});

app.get('/', function (req , res) {
  res.sendFile(path.join(__dirname, 'public','index.html'))
})

app.get('/upload', function (req , res) {
  res.sendFile(path.join(__dirname, 'public','upload.html'))
})

app.get('/api/ini',  async (req, res, next) =>{

    try {
      let threads = [];
      let oburl={};
      const files = await fs.readdir('./public/images');
        for (const file of files) {
          let urls = [];
          let obsresp ={};
      var fpath = path.join('./public/images',file);
     let images = await fs.readdir(fpath)  
      for  (let img of images)
      {  urls.push(`images/${file + '/' + img}`);}  

        obsresp.title = file;
         obsresp.urls = urls; 
         threads.push(obsresp);
        //console.log(obsresp);
      }
    //  console.log(files)
      res.json({threads});

    } catch (err) {
      console.error(err);
      next(err);
    }
  }

)

//const upload = multer({ dest: './public/images/uploads/' })
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    mkdir(`./public/images/${req.body.chp}`,{ recursive: true }) 
    cb(null, `./public/images/${req.body.chp}`)
   // console.log(req.body)
   // console.log(file)
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname)
  }
})
///const upload = multer({ dest: './public/images/uploads/' })
const upload = multer({ storage: storage })

app.post('/upload', upload.array('uploaded_fil'), function (req, res) {
   // req.file is the name of your file in the form above, here 'uploaded_file'
   // req.body will hold the text fields, if there were any 


   res.redirect('/upload')
  res.end();
});


app.listen(app.get('port'), () => {
  console.log(`Find the server at: http://localhost:${app.get('port')}/`); 
  // eslint-disable-line no-console
});

