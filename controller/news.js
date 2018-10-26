const express = require('express');
const router = express.Router();
const auth = require('./auth');
const newsModel = require('../model/news')

router.post('/', auth, async(req,res,next) => { // 添加管理员
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

router.get('/:id', async(req,res,next) => {
    try {
        const {id} = req.params

        const data = await newsModel
            .findById(id)
            .populate({path:'admin_user',select:'-password'})
            .populate({path:'category'})
        
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