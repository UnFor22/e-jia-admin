const express = require('express')
const router = express.Router();
const categoryModel = require('../model/category')

router.get('/', async(req,res,next)=>{
    try {
        const data = await categoryModel.find()

        res.json({
            code: 200,
            data,
            msg: 'success'
        })
    } catch(err) {
        next(err)
    }
})
module.exports = router