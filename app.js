// 导入express
const express = require('express');
// 创建express实例
const app = express();

// 配置cors跨域
const cors = require('cors');
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

//导入并使用用户路由模块
const userRouter = require('./router/user');
app.use('/api', userRouter);



// 启动服务器
app.listen(3007, () => {
  console.log('api server running at http://127.0.0.1:3007');
});