import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
 
let A = (u) =>{
 if(!u.l) return null;
 else return (<div>{'asdfasdf'}</div>)
}

ReactDOM.render(
  
    <App/>
  ,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals

