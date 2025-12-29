// -----用户处理函数-----
// 导入数据库操作模块
const db = require('../db/index');
// 导入bcryptjs包
const bcrypt = require('bcryptjs')
// 注册处理函数
exports.regUser = ((req, res) => {
    //获取客户端提交到服务器的用户信息
    const userInfo = req.body
    
    // 对用户信息进行合法性校验
    // if(!userInfo.username || !userInfo.password){
    //     return res.send({status:1, message:'用户名或密码不合法或为空！'})
    // }
    if(!userInfo.username || !userInfo.password) return res.cc('用户名或密码不合法或为空！')
    // 验证用户名是否被注册
    // 定义SQL语句
    const sqlStr = 'select * from ev_users where username=?'
    db.query(sqlStr,[userInfo.username],(err,results) => {
        // 执行SQL语句失败
        // if(err){
        //     // console.log(err);
        //     return res.send({status:1, message:err.message})
        // }
        if(err) return res.cc(err)
        // 用户名被占用
        // if(results.length > 0){
        //     return res.send({status:1, message:'用户名被占用，请更换其他用户名！'})
        // }
        if(results.length > 0) return res.cc('用户名被占用，请更换其他用户名！')
        // 用户名可用
        // 调用bcrypt.hashSync()对密码进行加密
         userInfo.password = bcrypt.hashSync(userInfo.password,10)
        //  console.log(userInfo);
        // 定义插入新用户的SQL语句
        const sql = ' insert into ev_users set ?'
        db.query(sql,{username:userInfo.username,password:userInfo.password},(err,results) => {
            // 判断SQL语句是否执行成功
            // if(err)return res.send({status:1, message:err.message})
            if(err) return res.cc(err)
            // 判断影响行数是否为1
        // if(results.affectedRows !== 1)return res.send({status:1, message:'注册用户失败，请稍后再试！'})
        if(results.affectedRows !== 1) return res.cc('注册用户失败，请稍后再试！')
        //     // 注册成功
        // res.send({status:0, message:'注册成功！'})
        res.cc('注册成功！',0)
        })  
    })
})

// 登录处理函数
exports.login = ((req, res) => {
    res.send('login OK');    
})