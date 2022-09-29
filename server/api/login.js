let db = require('../db/index')

exports.login = (req, res) => {
    var sql = 'select * from user where name = ? and password = ?'
    console.log(req.query.name);
    db.query(sql, [req.query.name, req.query.password], (err, data) => {
        console.log(data);
        console.log(data.length);
        if(err) {
            return res.send({
              status: 400,
              message: "登录失败"
            })
        }
        if(data.length > 0) {
        res.send({
            status: 100,
            token: 'ok',
            message: "登录成功"
          })
        }else{
        res.send({
            status: 202,
            message: '用户名或密码错误'
          })
        }
    })
}

exports.loginStu = (req, res) => {
  var sql = 'select * from student where id = ? and password = ?'
  console.log(req.query.name);
  db.query(sql, [req.query.name, req.query.password], (err, data) => {
      console.log(data);
      console.log(data.length);
      if(err) {
          return res.send({
            status: 400,
            message: "登录失败"
          })
      }
      if(data.length > 0) {
      res.send({
          status: 100,
          token: 'ok',
          message: "登录成功"
        })
      }else{
      res.send({
          status: 202,
          message: '用户名或密码错误'
        })
      }
  })
}