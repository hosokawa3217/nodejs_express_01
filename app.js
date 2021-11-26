// sqlite3 npm install sqlite3

const express = require('express');
const app = express();
const port = 3000;

// // Express での静的ファイルの提供
// app.use(express.static('public'));
// // Expressで、配列型のフォームデータを受け取る
// app.use(express.urlencoded({extended: false}));
const mysql = require('mysql');

//mysqlへの接続の設定  test用 事前にdatabaseやユーザは作成していること
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'db_user',
  password: 'pass',
  database: 'testdb'
});

connection.connect((err) => {
  if (err) {
    console.log('error connecting: ' + err.stack);
    return;
  }
  console.log('db conection success');
});

// const { execSync } = require('child_process');
// const stdout = execSync('curl inet-ip.info');
// console.log(`stdout: ${stdout.toString()}`);

app.get('/', (req, res) => {
  res.render('hello.ejs');
});

//testdbのitemsテーブルの内容を表示
app.get('/top', (req, res) => {
  connection.query(
    'select * from items',
    (error,results) => {
      console.log(results);
      res.render('top_page.ejs',{items: results});
    });
});


app.listen(port, () => {
    console.log(`listening at http://localhost:${port}`);
    // console.log(`if external server : listening at http://${stdout.toString().trim()}:${port}`);  
});
