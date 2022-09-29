let db = require('../db/index')


exports.addTest1 = (req,res)=>{
    const sql = 'insert into test(id,info,time) values(?,?,?)'
    console.log(req.query);
    db.query(sql, [1,req.query.info,req.query.time], (err,data)=>{
        if(err) {
            return res.send({
              status: 400,
              message: "操作失败"
            })
        }else{
            return res.send({
                status: 200,
                message: '添加成功'
            })
        }
    })
}

exports.addTest2 = (req,res)=>{
    const sql = 'insert into test(id,info) values(?,?)'
    console.log(req.query);
    db.query(sql, [2,req.query.info], (err,data)=>{
        if(err) {
            return res.send({
              status: 400,
              message: "操作失败"
            })
        }else{
            return res.send({
                status: 200,
                message: '添加成功'
            })
        }
    })
}

exports.testCheck = (req,res)=>{
    const sql = 'select * from stuTest where stuId=? and complete=?'
    db.query(sql, [req.query.stuId,1], (err,data)=>{
        if(err){
            res.send({
                status: 400
            })
        }else{
            res.send({
                status: 200,
                data: data
            })
        }
    })
}

exports.getTest = (req,res)=>{
    const sql = 'select * from test'
    db.query(sql, (err,data)=>{
        if(err){
            res.send({
                status: 400
            })
        }else{
            res.send({
                status: 200,
                data: data
            })
        }
    })
}

exports.getComplete = (req,res)=>{
    let resComplete = new Array()
    console.log(req.query.allTest);
    const sql = 'select count(*) from stuTest where info=? and complete=?'
    new Promise((resolve,reject)=>{
        for(let item of req.query.allTest){
            console.log(item);
            let itemNew = JSON.parse(item)
            console.log(itemNew.info);
            db.query(sql, [itemNew.info,1], (err,data)=>{
                if(err){
                    resolve(false)
                }else{
                    resComplete.push(data)
                    resolve(true)
                }
            })
        }
    }).then(results =>{
        if(results == true){
            res.send({
                status: 200,
                data: resComplete
            })
        }else{
            res.send({
                status: 400
            })
        }
    })

}