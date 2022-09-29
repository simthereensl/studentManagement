let db = require('../db/index')

exports.insertStuTest = (req,res)=>{
  let a = false
    const sql1 = 'select * from test'
    const sql2 = 'select * from stuTest where tid=? and info=?'
    const sql3 = 'insert into stuTest(stuId,tid,info,time) values(?,?,?,?)'
    db.query(sql1,(err,data)=>{
        if (err) {
          return res.send({
            status: 400,
            message: "操作失败"
          });
        } else {
          for (let item of data) {
            // console.log(item.id);
            db.query(sql2, [item.id, item.info], (err, data) => {
              if (err) {
              }
              if (data.length > 0) {
              } else {
                db.query(sql3, [req.query.stuId, item.id, item.info, item.time], (err,data)=>{
                    if(err) {
                        return res.send({
                          status: 400,
                          message: "添加失败"
                       })
                    }
                    a = true
                })
              }
            });
          }
          if(a == true){
            res.send({
              status: 200,
              message: "添加成功"
            })
          }else{
            res.send({
              status: 202,
              message: "已存在"
            })
          }
          //console.log(data);
        }
    })
    
}

exports.showInfo1 = (req,res)=>{
    const sql = 'select * from stuTest where tid = 1'
    db.query(sql,(err,data)=>{
        if(err) {
            return res.send({
              status: 400,
              message: "操作失败"
            })
        }else{
            return res.send({
                status: 200,
                data: data
            })
        }
    })
}
exports.showInfo2 = (req,res)=>{
    const sql = 'select * from stuTest where tid = 2'
    db.query(sql,(err,data)=>{
        if(err) {
            return res.send({
              status: 400,
              message: "操作失败"
            })
        }else{
            return res.send({
                status: 200,
                data: data
            })
        }
    })
}
exports.finishInfo1 = (req,res)=>{
  console.log(req.query.stuId);
    console.log(req.query.info);
    const sql = 'update stuTest set complete=? where stuId=? and info=? '
    db.query(sql, [true, req.query.stuId, req.query.info], (err,data)=>{
        if(err){
            return res.send({
                status: 400,
                message: "操作失败"
              })
        }else{
            return res.send({
                status: 200,
                message: '操作成功'
            })
        }
    })
}
