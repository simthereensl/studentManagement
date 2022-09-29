let express = require('express')
let app = express()
let router = require('./router')
let cors = require('cors')
let bodyParser = require('body-parser')

app.use(bodyParser.json());  //配置解析，用于解析json和urlencoded格式的数据
app.use(bodyParser.urlencoded({extended: false}));
app.use(cors())             //配置跨域

app.use(router)  


app.listen(80 , () =>{
    console.log('服务器启动成功');
})