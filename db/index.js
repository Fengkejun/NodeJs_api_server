// 下载并导入mysql模块
const mysql = require('mysql');
// 创建mysql连接池
const db= mysql.createPool({
    host: "127.0.0.1",
    user: "root",
    password: "admin123",
    database: "my_db_01"
})

module.exports = db 