const cp = require('child_process');
console.log('start mongod');
const child = cp.exec('mongod', (error, stdout, stderr) => {
  if (error) {
    throw error;
  }
});