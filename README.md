# nodejs_express_sample

node.js+express+ ejs + sqlite3   の シンプルなサンプルプロジェクト

npm install express ejs sqlite3

### SQLiteダウンロード
https://www.sqlite.org/download.html

sqlite-tools-win32-x86-3360000.zip
(1.82 MiB)		A bundle of command-line tools for managing SQLite database files, including the command-line shell program, the sqldiff.exe program, and the sqlite3_analyzer.exe program.

### SQLiteのインストール
- フォルダを作る
C:\Sqlite3
- 環境変数に 上記のフォルダを追加
　コマンドプロンプトで>envと入力して、パスが登録されているか確認する

- 解凍した3つのファイルを上記のフォルダにいれる
$ ls c:/sqlite3
sqldiff.exe*  sqlite3.exe*  sqlite3_analyzer.exe*

- sqlite3が起動できるか確認
$ sqlite3 --version
3.36.0 2021-06-18 18:36:39 5c9a6c06871cb9fe42814af9c039eb6da5427a6ec28f187af7ebfb62eafa66e5

### データベースを作成する
- 今回のデータベース名は survey.sqlite3
$ sqlite3 servey.sqlite3

sqlite> CREATE TABLE test_table (id int PRIMARY KEY, name char(30));

- 不安なので、テーブル一覧を確認します。
sqlite> .tables 
test_table

- テーブルの定義を確認する場合は、「.schema」コマンドを利用します。

sqlite> .schema test_table 
CREATE TABLE test_table (id int PRIMARY KEY, name char(30));

- SQLiteを終了する
sqlite> .exit

#### node.jsでアクセスするテスト
```
const sqlite3 = require("sqlite3");
const db = new sqlite3.Database("./survey.db");

// db.run("drop table if exists members");
db.run("create table if not exists members(name,age)");
db.run("insert into members(name,age) values(?,?)", "hoge", 33);
db.run("insert into members(name,age) values(?,?)", "foo", 44);
db.each("select * from members", (err, row) => {
    console.log(`${row.name} ${row.age}`);
});

db.close();
```
