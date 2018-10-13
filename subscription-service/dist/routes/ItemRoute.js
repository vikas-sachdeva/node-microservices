"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const service = require("./../services/itemService");
class ItemRoute {
    constructor() {
        this._router = express_1.Router();
        this.init();
    }
    get route() {
        return this._router;
    }
    /**
       * Take each handler, and attach to one of the Express.Router's
       * endpoints.
       */
    init() {
        this._router.get('/', this.getAllItems);
    }
    getAllItems(req, res, next) {
        let itemService = new service.ItemService();
        res.send(itemService.getAllItems());
    }
}
exports.ItemRoute = ItemRoute;
exports.default = new ItemRoute();
//# sourceMappingURL=ItemRoute.js.map