const { unifiedResponse, handleError } = require('../utils/responseHandler');
const roleService = require('../services/role.service');
const permissionService = require('../services/permission.service');

module.exports = (() => {
    const router = require("express").Router();
    router.get("/", async (req, res, next) => {
        try {
            var page = parseInt(req.query.page) || 1;
            var limit = parseInt(req.query.limit) || 8;
            var searchword=req.query.role_name;
            var result = await roleService.getAllPaginatedRoles(page, limit,searchword);
            return res.status(201).json(unifiedResponse(201, "roles retrived successfully", result));
        } catch (error) {
            handleError(error);
        }
    })

    router.get('/allpermissions', async (req, res, next) => {
        try {

            var result = await permissionService.getAllPermissionService();
            return res.status(201).json(unifiedResponse(201, "permissions retreived successfully", result))
        } catch (error) {
            handleError(error);
        }
    })

    router.post('/', async (req, res, next) => {
        try {
            let { role_id, ...data } = req.body;

            var result = await roleService.saveRoleService(data);
            return res.status(201).json(unifiedResponse(201, "role added successfully", result))
        } catch (error) {
            handleError(error);
        }
    })

    router.put('/', async (req, res, next) => {
        try {
           // var {status,...data}=req.body;
            var result = await roleService.updateRoleService(req.body);
            if(result!=0){
                return res.status(201).json(unifiedResponse(201, "role updated successfully", result))
            }
            return res.status(201).json(unifiedResponse(201, "role is not found", result))
        } catch (error) {
            handleError(error);
        }
    })

    router.put('/:role_id/:status', async (req, res, next) => {
        try {
            const { role_id, status } = req.params;
            var result = await roleService.changeStatusRoleService(role_id,status);
            if(result!=0){
                return res.status(201).json(unifiedResponse(201, "role status updated successfully", result))
            }
            return res.status(201).json(unifiedResponse(201, "role is not found", result))
        } catch (error) {
            handleError(error);
        }
    })

    router.get("/active", async (req, res, next) => {
        try {
            
            var result= await roleService.getAllActiveRoles();
            return res.status(201).json(unifiedResponse(201, "roles retrived successfully", result));
        } catch (error) {
            handleError(error);
        }
    })


    return router;
})();