// 导入express
const express = require('express');
// 创建express实例
const app = express();
//导入用户路由模块
const userRouter = require('./router/user');
// 全局错误级别中间件
const joi = require('@hapi/joi')

// 导入配置文件
const config = require('./config')

// 导入解析token的中间件
const { expressjwt }= require('express-jwt');

// 使用 .unless({ path: [/^\/api\//] }) 指定哪些接口不需要进行 Token 的身份认证
app.use(expressjwt({secret:config.jwtSecretKey,algorithms: ['HS256']}).unless({path:[/^\/api\//]}));

// 配置cors跨域
const cors = require('cors');



// 使用cors中间件
app.use(cors());

// 配置解析表单数据的中间件
// 注意:只能解析`application/x-www-form-urlencoded` 格式的表单数据的中间件
app.use(express.urlencoded({ extended: false }));

// 封装响应数据的中间件
app.use((req,res,next)=>{
    // status 默认值为1，表示失败的情况
    // err的值可能是一个错误对象，也可能是一个错误的描述字符串
    res.cc = (err,status = 1)=>{
        res.send({
            status,
            message: err instanceof Error ? err.message : err // 对err进行判断是否为错误对象或字符串
        })
    }

    next();                      
})





app.use('/api', userRouter);

// 错误级别中间件
app.use((err,req,res,next)=>{
    // 在错误处理中间件中定义res.cc函数
    res.cc = (err,status = 1)=>{
        res.send({
            status,
            message: err instanceof Error ? err.message : err
        })
    }
    // 数据验证失败
    if(err instanceof joi.ValidationError) return res.cc(err);
    // 捕获身份认证失败的错误
    if(err.name === 'UnauthorizedError') return res.cc('身份认证失败！');

    // 未知错误
    res.cc(err);

})

// 启动服务器
app.listen(3007, () => {
  console.log('api server running at http://127.0.0.1:3007');
});
