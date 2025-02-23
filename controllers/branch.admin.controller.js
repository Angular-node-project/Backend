const branchservice = require("../services/branch.service");
const { createbranchDto } = require('../validators/branch.validator');
const { unifiedResponse, handleError } = require('../utils/responseHandler');
module.exports = (() => {
    const router = require("express").Router();
    router.post("/", async (req, res, next) => {
        try {
            const { error, value } = createbranchDto.validate(req.body, { abortEarly: false });
            if (error) {
                const errors = error.details.map(e => e.message);
                return res.status(400).json(unifiedResponse(400, 'Validation Error', errors));
            }
            const branch = await branchservice.createBranch(value);
            return res.status(201).json(unifiedResponse(201, 'branch created successfully', branch));
        } catch (err) {
            handleError(res, err);
        }
    })
    router.patch("/:branchid", async (req, res, next) => {
        try {
            const branchid = req.params.branchid;
            const { error, value } = createbranchDto.validate(req.body, { abortEarly: false });
            if (error) {
                const errors = error.details.map(e => e.message);
                return res.status(400).json(unifiedResponse(400, 'Validation Error', errors));
            }

            const branch = await branchservice.updateBranch(branchid, value);
            return res.status(201).json(unifiedResponse(201, 'branch updated successfully', branch));
        } catch (err) {
            handleError(res, err);
        }
    })


    router.patch("/changestatus/:branchid/:status", async (req, res, next) => {
        try {
            const branchid = req.params.branchid;
            const status = req.params.status;
            const branch = await branchservice.changestatus(branchid, status);
            return res.status(201).json(unifiedResponse(201, 'branch status updated successfully', branch));
        } catch (err) {
            handleError(res, err);
        }
    })


    router.get("/", async (req, res, next) => {
        try {
            var page = parseInt(req.query.page) || 1;
            var limit = parseInt(req.query.limit) || 6;
            var status = req.query.status;
            var search = req.query.search;
            var sort = req.query.sort;
            if (page || status || search || limit || sort) {
                const result = await branchservice.getAllbranchesPaginated(page, limit, sort, search, status);
                return res.status(201).json(unifiedResponse(201, 'Paginated branches returned successfully', result));
            } else {
                const branches = await branchservice.getBranches();
                return res.status(201).json(unifiedResponse(201, 'All branches returned successfully', branches));
            }
        } catch (err) {
            handleError(res, err);
        }
    })

    router.get("/all/active", async (req, res, next) => {
        try {
            const result = await branchservice.getAllActiveBranches();
            return res.status(201).json(unifiedResponse(201, 'branches retreived succeffully', result));

        } catch (err) {
            handleError(res, err);
        }
    })


    return router;
})()