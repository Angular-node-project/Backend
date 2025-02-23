const branchOrderService = require("../services/branchorder.service");
const { unifiedResponse, handleError } = require('../utils/responseHandler');
module.exports = (() => {
    const router = require("express").Router();
    router.get("/", async (req, res, next) => {
        try {

            var page = parseInt(req.query.page) || 1;
            var limit = parseInt(req.query.limit) || 9;
            var status = req.query.status;
            var search = req.query.search;
            var branch_id = req.data.branch.branch_id;
            if (page || status || search || limit || branch_id) {
                const result = await branchOrderService.getAllBrnachOrdersPaginated(page, limit, status, search, branch_id);
                return res.status(201).json(unifiedResponse(201, 'Paginated OrderBranches returned successfully', result));
            } else {
                const branches = await branchOrderService.getALllBranchOrders();
                return res.status(201).json(unifiedResponse(201, 'All OrderBranches returned successfully', branches));
            }
        } catch (err) {
            handleError(res, err);
        }
    })

    router.put("/changestatus/:orderId/:status", async (req, res, next) => {
        try {
            var order_Id = req.params.orderId;
            var branch_Id = req.data.branch.branch_id;
            var status = req.params.status;
            var result = await branchOrderService.changeBranchOrderStatusService(order_Id, branch_Id, status);
            return res.status(201).json(unifiedResponse(201, 'order branch status changed', result));
        } catch (err) {
            handleError(res, err);
        }
    })

    router.put("/cancel/:orderId", async (req, res, next) => {
        try {
            var order_Id = req.params.orderId;
            var branch_Id = req.data.branch.branch_id;
            var result = await branchOrderService.cancelBranchOrderService(order_Id, branch_Id);
            return res.status(201).json(unifiedResponse(201, 'order branch cancelled successfully', result));
        } catch (err) {
            handleError(res, err);
        }
    })

    return router;
})()