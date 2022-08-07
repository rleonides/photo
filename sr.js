/*const { deflate, unzip } = require('zlib');

const input = '.................................';
deflate(input, (err, buffer) => {
  if (err) {
    console.error('An error occurred:', err);
    process.exitCode = 1;
  }
  console.log(buffer.toString());
});*/
/*const mkdir = require('fs').mkdirSync;
console.log(mkdir('./tmp/a/appl',{ recursive: true }));*/
/*const util = require('util');
let data = {
  content: [{ value: 1 },
  {
    value: 2,
    content: [{ value: 22 }]
  }
  ]

}

const setAccesPathToAllObjects = (obj, path = '') => {

  if (obj instanceof Array) {
    obj.forEach((e, i) => {
      setAccesPathToAllObjects(e, `${path}[${i}]`);
    })
    return;
  }
  if (obj instanceof Object) {
    obj['path'] = path; Object.keys(obj).forEach(e => {
      setAccesPathToAllObjects(obj[e], `${path && path + '.'}${e}`);
    })
  }
}
setAccesPathToAllObjects(data)

console.log(util.inspect(data, false, null, true))*/