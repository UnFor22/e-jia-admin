const {Router} = require ('express')
const router = Router()
const adminUserModel = require('../model/adminUser')
const auth = require('./auth')

router.get('/', auth, async(req,res,next) => {
    try {
        let {page=1, page_size = 10} =req.query
        page = parseInt(page)
        page_size = parseInt(page_size) 

        const dataList = await adminUserModel
            .find()
            .skip((page-1)*page_size)
            .limit(page_size)
            .sort({_id:-1})
            .select('-password')
        
        res.json({
            code: 200,
            data: dataList,
            msg: 'success'
        })
    }catch(err){
        next(err)
    }
})

router.post('/', auth, async(req,res,next) => { // 添加管理员
    try {
        let {
            username,
            nickname,
            avatar,
            password,
            desc,
            job,
            phone,
            sex
        } = req.body
        const data = await adminUserModel.create({
            username,
            nickname,
            avatar,
            password,
            desc,
            job,
            phone,
            sex
        })
        res.json({
            code: 200,
            data,
            msg: '新建管理员用户成功'
        })
    } catch(err) {
        next(err)
    }
})

// admin/adminUser/login
router.post('/login',async(req, res, next) => {
    try {
        let {username, password} = req.body;
        if(username&&password) {
            let user = await adminUserModel.findOne({username})
            if(user){  //有没有这个用户
                if(password = user.password) {
                    req.session.user = user // 将用户的信息存到session里
                    res.json({
                        code: 200,
                        msg: '登录成功'
                    })
                } else {
                    res.json({
                        code: 401,
                        msg: '密码错误'
                    })
                }
            } else {
                res.json({
                    code: 401,
                    msg: '该用户不存在'
                })
            }
        } else {
            res.json({
                code: 400,
                msg: '缺少必要参数'
            })
        }
    } catch(err) {
        next(err)
    }
})

module.exports = router