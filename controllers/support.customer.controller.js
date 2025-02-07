const supportService = require('../services/customerservice.service');



module.exports=(()=>{
    const router=require("express").Router();
    router.post("/send",async(req,res,next)=>{
        try {
            const support = await supportService.sendMessage(req.body);
            res.status(201).json({ message: 'Support created successfully', support });
        } catch (error) {
            res.status(500).json({ message: 'Error creating support', error });
        }
    })
    router.get("/get",async(req,res,next)=>{
        try {
            const support = await supportService.getMessages();
            res.status(200).json({ support });
        } catch (error) {
            res.status(500).json({ message: 'Error getting support messages', error });
        }
    })
    return router;
})()