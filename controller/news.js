const {Router} = require ('express')
const router = Router()
const newsModel = require('../model/news')
const auth = require('./auth')

router.post('/', auth, async(req,res,next) => { 
    try {
        let {
            title,
            content,
            contentText,
            img,
            author,
            type,
            look_num
        } = req.body
        const data = await newsModel.create({
            title,
            content,  
            contentText,
            img,
            author,
            type,
            look_num
        })
        res.json({
            code: 200,
            data,
            msg: '新建新闻成功'
        })
    } catch(err) {
        next(err)
    }
})

router.get('/', async(req,res,next) => {
    try {
        let {page = 1, page_size = 10} = req.query
        page = parseInt(page)
        page_size = parseInt(page_size)

        const data = await newsModel
            .find()
            .skip((page-1)*page_size)
            .limit(page_size)
            .sort({_id: -1})
            .populate({
                path: 'author'
            })
            .populate({path:'type'})
        
        res.json({
            code: 200,
            data: data,
            msg: 'success'
        })
    }catch(err){
        next(err)
    }
})
router.get('/:id', async(req,res,next) => {
    try {
        const {id} = req.params
        const data = await newsModel
            .findById(id)
            .populate({
                path:'author'
            })
            .populate({path:'type'})  
        res.json({
            code: 200,
            data: data,
            msg: 'success'
        })
    }catch(err){
        next(err)
    }
})

module.exports = router