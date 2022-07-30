const fs = require('fs').promises;
var join = require('path').join;
 let f = async ()=>{
const files = await fs.readdir(join(__dirname, 'public/images/folder1'));
let f = await fs.readFile(join(__dirname, 'public/images/folder1/', files[0]), 'base64')
console.log(f)}


let a  = new Uint8Array([3,1,7,4])
let b  = new Uint32Array(a.buffer)
let o = {}

console.log(0x00000000000001 + 3)
