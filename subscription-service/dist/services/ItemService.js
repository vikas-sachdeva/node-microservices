"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const model = require("./../models/Item");
class ItemService {
    getAllItems() {
        let itemList = [
            new model.Item("id1", "item1"),
            new model.Item("id2", "item2"),
            new model.Item("id3", "item3"),
            new model.Item("id4", "item4"),
            new model.Item("id5", "item5"),
        ];
        return itemList;
    }
}
exports.ItemService = ItemService;
//# sourceMappingURL=ItemService.js.map