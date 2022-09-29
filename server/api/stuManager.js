let db = require('../db/index')

exports.addStudent = (req,res) =>{
    const sql1 = 'select * from student where id = ?'
    const sql2 = 'insert into student(id,name,password) values(?,?,?) '
    db.query(sql1, [req.query.id], (err, data) =>{
        if(err) {
            return res.send({
              status: 400,
              message: "操作失败"
            })
        }if(data.length > 0) {
            return res.send({
              status: 202,
              message: '用户名已存在'
            })
        }else{
            db.query(sql2, [req.query.id,req.query.name, req.query.password], (err, data) => {
                if(err) {
                    return res.send({
                      status: 400,
                      message: "添加失败"
                    })
                }
                res.send({
                  status: 200,
                  message: "添加成功"
                })
              })
        }
    })
}

exports.showStudent = (req,res) =>{
    const sql = 'select * from student'
    db.query(sql,(err,data) =>{
        if(err) {
            return res.send({
              status: 400,
              message: "操作失败"
            })
        }else{
            return res.send({
                data: data
            })
        }
    })
}

exports.deleteStudent = (req,res) =>{
  const sql = 'delete from student where id=?'
  db.query(sql, [req.query.id], (err,data) =>{
    if(err) {
      return res.send({
        status: 400,
        message: "操作失败"
      })
    }else{
      return res.send({
        status: 200
      })
    }
  })
}

exports.editStudent = (req,res) =>{
  const index = req.query.index
  const sql = 'update student set id=?,name=?,password=? where id=?'
  db.query(sql, [req.query.id, req.query.name, req.query.password,req.query.id], (err,data) =>{
    if(err){
      return res.send({
        status: 400
      })
    }else{
      return res.send({
        status: 100
      })
    }
  })
}

exports.uploadFile = (req,res) =>{
  const sql1 = 'select * from student where id = ?'
  const sql2 = 'insert into student(id,name,password,class) values(?,?,?,?) '
  console.log(req.query);
  const obj = req.query
  let a = true
  for(let k in obj){
    let myObj = JSON.parse(obj[k]);
    db.query(sql1, myObj.id, (err, data) =>{
      if(err) {
        a = false
          return res.send({
            status: 400,
            message: "操作失败"
          })
      }if(data.length > 0) {
        a = false
          return res.send({
            status: 202,
            message: '用户名已存在'
          })
        }else{
          db.query(sql2, [myObj.id,myObj.name, myObj.password,myObj.class], (err, data) => {
            if(err) {
              a = false
               return res.send({
                    status: 400,
                    message: "添加失败"
                })
             }
            })
        }
      })
  }
  if(a == true){
    res.send({
      status: 200,
      message: "添加成功"
    })
  }
}