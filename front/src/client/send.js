
//const util = require('util')
//let fetch = require("isomorphic-fetch")
const Send =  (data) => {
 const url = ('/api/send'); 
  return fetch(url, {
    method: 'post',
    body: JSON.stringify(data),
    headers: {
      'Accept':  "*",
      'Content-Type': 'application/json',
    },
  }).then(checkStatus)
    .then(res => res.json()).then((e)=>{ console.log(e); return e})
    
}

function checkStatus(res) {
    if (res.status >= 200 && res.status < 300) {
      return res;
    } else {
      const error = new Error(`HTTP Error ${res.statusText}`);
      error.status = res.statusText;
      error.response = res;
      console.log(error);
      throw error;
    }
  }





  //Send();
  export default Send;
  
  //console.log("sdfsf")