let express = require('express')
let router = express.Router()

let login = require('./api/login')
let stuManager = require('./api/stuManager')
let testManager = require('./api/testManager')
let infoManager = require('./api/infoManager')

router.get('/login',login.login)
router.get('/loginStu',login.loginStu)

router.post('/addStudent',stuManager.addStudent)
router.get('/showStudent',stuManager.showStudent)
router.post('/deleteStudent',stuManager.deleteStudent)
router.post('/editStudent',stuManager.editStudent)
router.post('/uploadFile',stuManager.uploadFile)

router.post('/relTest1',testManager.addTest1)
router.post('/relTest2',testManager.addTest2)
router.get('/testCheck',testManager.testCheck)
router.get('/getTest',testManager.getTest)
router.get('/getComplete',testManager.getComplete)

router.post('/insertStuTest',infoManager.insertStuTest)
router.get('/showInfo1',infoManager.showInfo1)
router.get('/showInfo2',infoManager.showInfo2)
router.post('/finishInfo1',infoManager.finishInfo1)

module.exports = router
