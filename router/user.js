// 用户路由模块
const express = require('express');
const router = express.Router();
// 导入用户路由处理函数模块
const userHandler = require('../router_handler/user');
// 注册新用户
router.post('/register', userHandler.regUser);

// 登录
router.post('/login', userHandler.login);



// 导出路由模块
module.exports = router;