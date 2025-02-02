const clerkService=require('../services/clerk.service.js');
const {createclerkDto}=require('../validators/clerk.validator.js');
const { unifiedResponse, handleError } = require('../utils/responseHandler.js');

module.exports = (() => {
    const router = require("express").Router();
    router.get("/", async (req, res, next) => {
        try {
            const user = await clerkService.getUsers();
            return res.status(201).json(unifiedResponse(201, 'Clerks Retrived successfully', user));

        } catch (err) {
            handleError(res, err);
        }
    })
    router.get("/byid/:id", async (req, res, next) => {
        try {
            const userid = req.params.id;
            const user = await clerkService.getUserbyid(userid);
            if (user) {
                return res.status(201).json(unifiedResponse(201, 'Clerk Retrived successfully', user));
            } else {
                return res.status(403).json(unifiedResponse(403, 'User not found'));
            }

        } catch (err) {
            handleError(res, err);
        }
    })

    router.get("/:status", async (req, res, next) => {
        try {
            const status = req.params.status;
            const user = await clerkService.getUsersBystatus(status);
            return res.status(201).json(unifiedResponse(201, 'Clerks Retrived successfully', user));

        } catch (err) {
            handleError(res, err);
        }
    })
    router.patch("/:id", async (req, res, next) => {
        try {
            const { error, value } = createclerkDto.validate(req.body, { abortEarly: false });
            if (error) {
                const errors = error.details.map(e => e.message);
                return res.status(400).json(unifiedResponse(400, 'Validation Error', errors));
            }

            const userid = req.params.id;
            const user = await clerkService.updateUser(userid, value);
            if (user) {
                return res.status(201).json(unifiedResponse(201, 'Clerks Updates successfully', user));
            } else {
                return res.status(403).json(unifiedResponse(403, 'User not found'));
            }

        } catch (err) {
            handleError(res, err);
        }
    })
    router.patch("/delete/:id", async (req, res, next) => {
        try {
            const userid = req.params.id;
            const user = await clerkService.softDeleteUser(userid);
            if (user) {
                return res.status(201).json(unifiedResponse(201, 'Clerks Updated to inactive successfully', user));
            } else {
                return res.status(403).json(unifiedResponse(403, 'User not found'));
            }

        } catch (err) {
            handleError(res, err);
        }
    })
    router.patch("/restore/:id", async (req, res, next) => {
        try {
            const userid = req.params.id;
            const user = await clerkService.restoreUser(userid);
            if (user) {
                return res.status(201).json(unifiedResponse(201, 'Clerks Updated to active successfully', user));
            } else {
                return res.status(403).json(unifiedResponse(403, 'User not found'));
            }

        } catch (err) {
            handleError(res, err);
        }
    })
    return router;

})()