const {Router} = require ('express')
const router = Router()
const swiperModel = require('../model/swiper')
const auth = require('./auth')

router.post('/', auth, async(req,res,next) => { 
    try {
        let {
            title,
            sort,
            status,
            img,
            type        
        } = req.body
        const data = await swiperModel.create({
            title,
            sort,
            status,
            img,
            type  
        })
        res.json({
            code: 200,
            data,
            msg: '新建轮播图成功'
        })
    } catch(err) {
        next(err)
    }
})

router.patch('/:id', auth, async(req,res,next) => { 
    try {
        let {id} = req.params
        let {
            title,
            sort,
            status,
            img,
            type        
        } = req.body

        const data = await swiperModel.findById(id)
        const updateData = await data.update({
            $set:{
                title,
                sort,
                status,
                img,
                type  
            }    
        })
        res.json({
            code: 200,
            data: updateData,
            msg: '修改轮播图成功'
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

        const data = await swiperModel
            .find()
            .skip((page-1)*page_size)
            .limit(page_size)
            .sort({sort:1,_id: -1})
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
        const data = await swiperModel
            .findById(id)
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