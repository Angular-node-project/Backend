const categoryservice = require('../services/category.service');
const { unifiedResponse, handleError } = require('../utils/responseHandler');
const router = require("express").Router();

module.exports = (() => {

    router.get("/", async (req, res, next) => {
        try {
            const categories = await categoryservice.getActiveCategoriesService();
            return res.status(201).json(unifiedResponse(201, 'Categories retrieved successfully', categories));
        } catch (err) {
            handleError(res, err);
        }
    });

    return router;
})();