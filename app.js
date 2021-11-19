const express = require('express');

const app = express();
const port = 3000;

const { execSync } = require('child_process')
const stdout = execSync('curl inet-ip.info')
console.log(`stdout: ${stdout.toString()}`)

app.get('/', (req, res) => {
  res.render('hello.ejs');
});

app.listen(port, () => {
//  console.log(`listening at http://localhost:${port}`);
    console.log(`listening at http://${stdout.toString().trim()}:${port}`);  
});
